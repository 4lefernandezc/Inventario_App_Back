import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateInventarioSucursalDto } from './dto/create-inventario_sucursal.dto';
import { UpdateInventarioSucursalDto } from './dto/update-inventario_sucursal.dto';
import { InventarioSucursal } from './entities/inventario_sucursal.entity';
import { QueryInventarioSucursalDto } from './dto/query-inventario_sucursal.dto';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { Sucursal } from 'src/sucursales/entities/sucursal.entity';

@Injectable()
export class InventariosSucursalesService {
  constructor(
    @InjectRepository(InventarioSucursal)
    private readonly inventariosRepository: Repository<InventarioSucursal>,
    @InjectRepository(Ingrediente)
    private readonly ingredientesRepository: Repository<Ingrediente>,
    @InjectRepository(Sucursal)
    private readonly sucursalesRepository: Repository<Sucursal>,
  ) {}

  async create(
    createInventarioSucursalDto: CreateInventarioSucursalDto,
  ): Promise<InventarioSucursal> {
    const { idIngrediente, idSucursal } = createInventarioSucursalDto;

    const ingrediente = await this.ingredientesRepository.findOne({ where: { id: idIngrediente } });
    if (!ingrediente) {
      throw new NotFoundException(`Ingrediente con ID ${idIngrediente} no encontrado`);
    }
    
    const sucursal = await this.sucursalesRepository.findOne({ where: { id: idSucursal } });
    if (!sucursal) {
      throw new NotFoundException(`Sucursal con ID ${idSucursal} no encontrada`);
    }

    const nuevoInventario = this.inventariosRepository.create(createInventarioSucursalDto);
    return this.inventariosRepository.save(nuevoInventario);
  }

  async findAll(q: QueryInventarioSucursalDto) {
    const {
      page,
      limit,
      idIngrediente,
      idSucursal,
      stockActual,
      stockMinimo,
      stockMaximo,
      tipoUnidad,
      sidx,
      sord,
    } = q;

    const query = this.inventariosRepository.createQueryBuilder('inventarios_sucursales').select([
      'inventarios_sucursales.id',
      'inventarios_sucursales.idIngrediente',
      'inventarios_sucursales.idSucursal',
      'inventarios_sucursales.stockActual',
      'inventarios_sucursales.stockMinimo',
      'inventarios_sucursales.stockMaximo',
      'inventarios_sucursales.tipoUnidad',
      'inventarios_sucursales.fechaCreacion',
      'inventarios_sucursales.fechaModificacion',
    ])
    .leftJoinAndSelect('inventarios_sucursales.ingrediente', 'ingrediente')
    .leftJoinAndSelect('inventarios_sucursales.sucursal', 'sucursal');

    if (idIngrediente) {
      query.andWhere('inventarios_sucursales.idIngrediente = :idIngrediente', {
        idIngrediente,
      });
    }

    if (idSucursal) {
      query.andWhere('inventarios_sucursales.idSucursal = :idSucursal', {
        idSucursal,
      });
    }

    if (stockActual) {
      query.andWhere('inventarios_sucursales.stockActual = :stockActual', {
        stockActual,
      });
    }

    if (stockMinimo) {
      query.andWhere('inventarios_sucursales.stockMinimo = :stockMinimo', {
        stockMinimo,
      });
    }

    if (stockMaximo) {
      query.andWhere('inventarios_sucursales.stockMaximo = :stockMaximo', {
        stockMaximo,
      });
    }

    if (tipoUnidad) {
      query.andWhere('inventarios_sucursales.tipoUnidad ILIKE :tipoUnidad', {
        tipoUnidad: `%${tipoUnidad}%`,
      });
    }

    if (sidx) {
      query.orderBy(`inventarios_sucursales.${sidx}`, sord);
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

  async findOne(id: number): Promise<InventarioSucursal> {
    const inventario = await this.inventariosRepository.findOne({
      where: { id },
      relations: ['ingrediente', 'sucursal'],
    });
    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return inventario;
  }

  async update(
    id: number,
    updateInventarioSucursalDto: UpdateInventarioSucursalDto,
  ): Promise<{ message: string; inventario: InventarioSucursal }> {
    const inventario = await this.findOne(id);
    if (updateInventarioSucursalDto.idIngrediente) {
      inventario.idIngrediente = updateInventarioSucursalDto.idIngrediente;
    }
    if (updateInventarioSucursalDto.idSucursal) {
      inventario.idSucursal = updateInventarioSucursalDto.idSucursal;
    }
    Object.assign(inventario, updateInventarioSucursalDto);
    const updatedInventario = await this.inventariosRepository.save(inventario);
    return {
      message: `Inventario con ID ${id} actualizado exitosamente`,
      inventario: updatedInventario,
    };
  }

  async remove(id: number): Promise<{ message: string; inventario: InventarioSucursal }> {
    const inventario = await this.findOne(id);
    await this.inventariosRepository.remove(inventario);
    return {
      message: `Inventario con ID ${id} eliminado exitosamente`,
      inventario,
    };
  }
}
