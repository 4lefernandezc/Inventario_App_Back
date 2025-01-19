import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Between } from 'typeorm';
import { Caja } from './entities/caja.entity';
import { CreateCajaDto } from './dto/create-caja.dto';
import { Venta } from '../ventas/entities/venta.entity';
import { Compra } from 'src/compras/entities/compra.entity';

@Injectable()
export class CajasService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) {}

  async abrirCaja(createCajaDto: CreateCajaDto): Promise<Caja> {
    // Verificar si ya existe una caja abierta para la sucursal
    const cajaAbierta = await this.cajaRepository.findOne({
      where: {
        sucursal: { id: createCajaDto.idSucursal },
        estado: 'abierta',
      },
    });

    if (cajaAbierta) {
      throw new BadRequestException(
        'Ya existe una caja abierta para esta sucursal',
      );
    }

    const caja = this.cajaRepository.create({
      montoInicial: createCajaDto.montoInicial,
      fechaApertura: new Date(),
      estado: 'abierta',
      usuarioApertura: { id: createCajaDto.idUsuarioApertura },
      sucursal: { id: createCajaDto.idSucursal },
    });

    return this.cajaRepository.save(caja);
  }

  async cerrarCaja(idCaja: number, idUsuarioCierre: number): Promise<Caja> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const caja = await this.cajaRepository.findOne({
        where: { id: idCaja },
        relations: ['sucursal'],
      });

      if (!caja) {
        throw new NotFoundException(`Caja con ID ${idCaja} no encontrada`);
      }

      if (caja.estado === 'cerrada') {
        throw new BadRequestException('La caja ya está cerrada');
      }

      // Modificamos la consulta para obtener las ventas asociadas directamente a la caja
      const ventas = await this.ventaRepository.find({
        where: {
          caja: { id: idCaja },
          estado: 'completada',
        },
      });

      console.log('Ventas encontradas:', ventas); // Para debugging

      const compras = await this.compraRepository.find({
        where: {
          caja: { id: idCaja },
          estado: 'completada',
        },
      });

      console.log('Compras encontradas:', compras); // Para debugging

      // Calculamos el total de ingresos sumando las ventas
      const totalIngresos = ventas.reduce((sum, venta) => {
        return sum + parseFloat(venta.totalVenta.toString());
      }, 0);

      // Calculamos el total de egresos sumando las compras
      const totalEgresos = compras.reduce((sum, compra) => {
        return sum + parseFloat(compra.totalCompra.toString());
      }, 0);

      console.log('Total ingresos calculados:', totalIngresos); // Para debugging
      console.log('Total egresos calculados:', totalEgresos); // Para debugging

      // Calcular monto final correctamente
      const montoInicial = parseFloat(caja.montoInicial.toString());
      const montoFinal = montoInicial + totalIngresos - totalEgresos;

      console.log('Cálculo de monto final:', {
        montoInicial,
        totalIngresos,
        totalEgresos,
        montoFinal
      });

      // Actualizamos la caja usando el queryRunner
      await queryRunner.manager.update(Caja, idCaja, {
        totalIngresos: parseFloat(totalIngresos.toFixed(2)),
        totalEgresos: parseFloat(totalEgresos.toFixed(2)),
        montoFinal: parseFloat(montoFinal.toFixed(2)),
        fechaCierre: new Date(),
        estado: 'cerrada',
        usuarioCierre: { id: idUsuarioCierre },
      });

      await queryRunner.commitTransaction();

      // Retornamos la caja actualizada con todas sus relaciones
      return this.cajaRepository.findOne({
        where: { id: idCaja },
        relations: ['usuarioApertura', 'usuarioCierre', 'sucursal'],
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(
        `Error al cerrar la caja: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async obtenerCajaActual(idSucursal: number): Promise<Caja> {
    const caja = await this.cajaRepository.findOne({
      where: {
        sucursal: { id: idSucursal },
        estado: 'abierta',
      },
      relations: ['usuarioApertura', 'sucursal'],
    });

    if (!caja) {
      throw new NotFoundException('No hay caja abierta para esta sucursal');
    }

    return caja;
  }

  async obtenerCajas(): Promise<Caja[]> {
    return this.cajaRepository.find({
      relations: ['usuarioApertura', 'usuarioCierre', 'sucursal'],
    });
  }
}
