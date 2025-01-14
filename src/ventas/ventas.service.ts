import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Like } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { DetalleVenta } from './entities/detalle_venta.entity';
import { InventarioSucursal } from '../inventarios_sucursales/entities/inventario_sucursal.entity';

@Injectable()
export class VentasService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Venta)
    private readonly ventasRepository: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepository: Repository<DetalleVenta>,
    @InjectRepository(InventarioSucursal)
    private readonly inventarioRepository: Repository<InventarioSucursal>,
  ) {}

  private async generarNumeroDocumento(tipo: string): Promise<string> {
    const ultimaVenta = await this.ventasRepository.findOne({
      where: {
        numeroDocumento: Like(`${tipo}-%`),
      },
      order: {
        id: 'DESC',
      },
    });

    if (!ultimaVenta) {
      return `${tipo}-1`;
    }

    const ultimoNumero = parseInt(ultimaVenta.numeroDocumento.split('-')[1]);
    return `${tipo}-${ultimoNumero + 1}`;
  }

  async crearVenta(createVentaDto: CreateVentaDto): Promise<Venta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const { detalles, idSucursal, idCliente, idUsuario, tipoDocumento } = createVentaDto;
        let subtotalVenta = 0;

        // Verificar el stock de todos los productos antes de iniciar la transacción
        for (const detalle of detalles) {
            const inventario = await this.inventarioRepository.findOne({
                where: {
                    idProducto: detalle.idProducto,
                    idSucursal: idSucursal
                },
                relations: ['producto']
            });

            if (!inventario) {
                throw new BadRequestException(
                    `No se encontró inventario para el producto ${detalle.idProducto} en la sucursal ${idSucursal}`
                );
            }

            if (inventario.stockActual < detalle.cantidad) {
                throw new BadRequestException(
                    `Stock insuficiente para el producto ${inventario.producto.nombre}. Stock actual: ${inventario.stockActual}`
                );
            }
        }

        // Si todos los productos tienen stock suficiente, proceder con la creación de la venta
        const detallesConPrecios = await Promise.all(
            detalles.map(async (detalle) => {
                const inventario = await this.inventarioRepository.findOne({
                    where: {
                        idProducto: detalle.idProducto,
                        idSucursal: idSucursal
                    },
                    relations: ['producto']
                });

                // Actualizar el stock
                const nuevoStock = inventario.stockActual - detalle.cantidad;
                await this.inventarioRepository.update(
                    { id: inventario.id },
                    { stockActual: nuevoStock }
                );

                // Calcular subtotal del detalle
                const precioUnitario = inventario.producto.precioVenta;
                const subtotalDetalle = (precioUnitario * detalle.cantidad) - (detalle.descuento || 0);
                subtotalVenta += subtotalDetalle;

                return {
                    ...detalle,
                    precio_unitario: precioUnitario,
                    subtotal: subtotalDetalle
                };
            })
        );

      // Generar número de documento automático
      const numeroDocumento = await this.generarNumeroDocumento(tipoDocumento);

      // Crear la venta
      const venta = this.ventasRepository.create({
        numeroDocumento: numeroDocumento,
        subtotal: subtotalVenta,
        totalVenta: subtotalVenta, // Aquí se podria agregar impuestos si es necesario
        metodoPago: createVentaDto.metodoPago,
        estado: 'completada',
        cliente: idCliente ? { id: idCliente } : null,
        usuario: { id: idUsuario },
        sucursal: { id: idSucursal }
      });

      // Guardar la venta
      const ventaGuardada = await this.ventasRepository.save(venta);

      // Crear y guardar los detalles
      const detallesVenta = detallesConPrecios.map(detalle => 
        this.detalleVentaRepository.create({
          cantidad: detalle.cantidad,
          precioUnitario: detalle.precio_unitario,
          descuento: detalle.descuento || 0,
          subtotal: detalle.subtotal,
          producto: { id: detalle.idProducto },
          venta: ventaGuardada
        })
      );

      await this.detalleVentaRepository.save(detallesVenta);

      await queryRunner.commitTransaction();

      return this.obtenerVentaPorId(ventaGuardada.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async obtenerVentaPorId(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: {
        detalles: {
          producto: true
        },
        cliente: true,
        usuario: true,
      }
    });

    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    return venta;
  }
  
  async obtenerVentas(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: {
        detalles: {
          producto: true
        },
        cliente: true,
        usuario: true,
      },
      order: {
        fechaCreacion: 'DESC'
      }
    });
  }

  async anularVenta(id: number): Promise<Venta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Primero obtenemos la venta básica con bloqueo
      const venta = await queryRunner.manager.findOne(Venta, {
        where: { id },
        lock: { mode: 'pessimistic_write' }
      });

      if (!venta) {
        throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      }

      if (venta.estado === 'anulada') {
        throw new BadRequestException('Esta venta ya está anulada');
      }

      // Luego cargamos los detalles necesarios
      const ventaConDetalles = await queryRunner.manager
        .createQueryBuilder(Venta, 'venta')
        .leftJoinAndSelect('venta.detalles', 'detalles')
        .innerJoinAndSelect('detalles.producto', 'producto')
        .innerJoinAndSelect('venta.sucursal', 'sucursal')
        .where('venta.id = :id', { id })
        .getOne();

      if (!ventaConDetalles) {
        throw new NotFoundException(`No se encontraron los detalles de la venta ${id}`);
      }

      // Restaurar el stock de cada producto
      for (const detalle of ventaConDetalles.detalles) {
        const inventario = await queryRunner.manager.findOne(InventarioSucursal, {
          where: {
            idProducto: detalle.producto.id,
            idSucursal: ventaConDetalles.sucursal.id
          },
          lock: { mode: 'pessimistic_write' }
        });

        if (!inventario) {
          throw new NotFoundException(
            `No se encontró el inventario para el producto ${detalle.producto.id} en la sucursal ${ventaConDetalles.sucursal.id}`
          );
        }

        // Actualizar el stock usando el queryRunner
        await queryRunner.manager.update(
          InventarioSucursal,
          { id: inventario.id },
          { 
            stockActual: inventario.stockActual + detalle.cantidad,
            fechaModificacion: new Date()
          }
        );
      }

      // Actualizar estado de la venta
      venta.estado = 'anulada';
      venta.fechaAnulacion = new Date();
      await queryRunner.manager.save(Venta, venta);

      await queryRunner.commitTransaction();

      // Retornar la venta actualizada
      return this.obtenerVentaPorId(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException(
        'Error al procesar la anulación de la venta',
        error.message
      );
    } finally {
      await queryRunner.release();
    }
  }
}