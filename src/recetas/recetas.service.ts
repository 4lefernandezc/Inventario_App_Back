import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { DetalleReceta } from './entities/detalle_receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { QueryRecetaDto } from './dto/query-receta.dto';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private recetasRepository: Repository<Receta>,
    @InjectRepository(Ingrediente)
    private ingredientesRepository: Repository<Ingrediente>,
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
    private dataSource: DataSource,
  ) {}

  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Validar si el cliente existe
      const cliente = await this.clientesRepository.findOne({
        where: { id: createRecetaDto.idCliente },
      });
  
      const receta = new Receta();
      receta.nombre = createRecetaDto.nombre.trim();
      receta.precioBase = createRecetaDto.precioBase;
      receta.descripcion = createRecetaDto.descripcion?.trim() || null;
      receta.cliente = cliente;
  
      // Calcular subtotales y monto total
      const detallesConSubtotal = await Promise.all(
        createRecetaDto.detalles.map(async (detalle) => {
          const ingrediente = await this.ingredientesRepository.findOne({
            where: { id: detalle.idIngrediente },
          });
  
          if (!ingrediente) {
            throw new NotFoundException(
              `Ingrediente con ID ${detalle.idIngrediente} no existe`,
            );
          }
  
          return {
            ...detalle,
            subtotal: detalle.cantidad * ingrediente.precioCompra,
          };
        }),
      );
  
      const montoTotal = detallesConSubtotal.reduce(
        (total, detalle) => total + detalle.subtotal,
        0,
      );
  
      receta.montoTotal = montoTotal + receta.precioBase;
  
      const savedReceta = await queryRunner.manager.save(Receta, receta);
  
      // Guardar detalles
      await Promise.all(
        detallesConSubtotal.map(async (detalle) => {
          const detalleReceta = new DetalleReceta();
          detalleReceta.receta = savedReceta;
          detalleReceta.idIngrediente = detalle.idIngrediente;
          detalleReceta.cantidad = detalle.cantidad;
          detalleReceta.subtotal = detalle.subtotal;
          return queryRunner.manager.save(DetalleReceta, detalleReceta);
        }),
      );
  
      await queryRunner.commitTransaction();
      return savedReceta;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  
  async update(
    id: number,
    updateRecetaDto: UpdateRecetaDto,
  ): Promise<{ message: string; receta: Receta }> {
    const receta = await this.findOne(id);
  
    if (updateRecetaDto.detalles) {
      const detallesConSubtotal = await Promise.all(
        updateRecetaDto.detalles.map(async (detalle) => {
          const ingrediente = await this.ingredientesRepository.findOne({
            where: { id: detalle.idIngrediente },
          });
  
          if (!ingrediente) {
            throw new NotFoundException(
              `Ingrediente con ID ${detalle.idIngrediente} no existe`,
            );
          }
  
          return {
            ...detalle,
            subtotal: detalle.cantidad * ingrediente.precioCompra,
          };
        }),
      );
  
      // Calcular el monto total
      const montoTotal = detallesConSubtotal.reduce(
        (total, detalle) => total + detalle.subtotal,
        0,
      );
      receta.montoTotal = montoTotal; // Asignar monto total
  
      // Eliminar detalles existentes y agregar los nuevos
      await this.dataSource.manager.delete(DetalleReceta, { idReceta: id });
  
      await Promise.all(
        detallesConSubtotal.map(async (detalle) => {
          const detalleReceta = new DetalleReceta();
          detalleReceta.receta = receta;
          detalleReceta.idIngrediente = detalle.idIngrediente;
          detalleReceta.cantidad = detalle.cantidad;
          detalleReceta.subtotal = detalle.subtotal; // Asignar subtotal
          return this.dataSource.manager.save(detalleReceta);
        }),
      );
    }
  
    const updatedReceta = Object.assign(receta, updateRecetaDto);
    await this.recetasRepository.save(updatedReceta);
  
    return {
      message: 'Receta actualizada exitosamente',
      receta: updatedReceta,
    };
  }

  async findAll(q: QueryRecetaDto) {
    const { page, limit, nombre, precioBase, idCliente, sidx, sord } = q;

    const query = this.recetasRepository
      .createQueryBuilder('recetas')
      .leftJoinAndSelect('recetas.detallesReceta', 'detalles')
      .leftJoinAndSelect('detalles.ingrediente', 'ingrediente')
      .leftJoinAndSelect('recetas.cliente', 'cliente');

    if (nombre) {
      query.andWhere('recetas.nombre ILIKE :nombre', { nombre: `%${nombre}%` });
    }

    if (precioBase) {
      query.andWhere('recetas.precioBase = :precioBase', { precioBase });
    }

    if (idCliente) {
      query.andWhere('cliente.id = :idCliente', { idCliente });
    }

    if (sidx) {
      query.orderBy(`recetas.${sidx}`, sord);
    }

    const [result, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: result,
      total,
      page,
      pageCount: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Receta> {
    const receta = await this.recetasRepository.findOne({
      where: { id },
      relations: ['detallesReceta', 'detallesReceta.ingrediente'],
    });
  
    if (!receta) {
      throw new NotFoundException(`Receta con ID #${id} no encontrada`);
    }
  
    // Calcular subtotales y monto total
    receta.detallesReceta.forEach((detalle) => {
      detalle.subtotal = Number(detalle.cantidad) * Number(detalle.ingrediente.precioCompra);
    });
  
    const montoTotal = receta.detallesReceta.reduce((total, detalle) => {
      return total + Number(detalle.subtotal);
    }, Number(receta.precioBase));
  
    receta.montoTotal = montoTotal;
  
    return receta;
  }

  async remove(id: number): Promise<{ message: string }> {
    const receta = await this.recetasRepository.findOne({
      where: { id },
      relations: ['detallesReceta'],
    });

    if (!receta) {
      throw new NotFoundException(`Receta con ID #${id} no encontrada`);
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.delete(DetalleReceta, { receta: { id } });
      await manager.remove(Receta, receta);
    });

    return { message: 'Receta eliminada exitosamente' };
  }

}