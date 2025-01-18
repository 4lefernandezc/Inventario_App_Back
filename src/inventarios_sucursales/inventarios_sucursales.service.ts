import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventarioSucursalDto } from './dto/create-inventario_sucursal.dto';
import { UpdateInventarioSucursalDto } from './dto/update-inventario_sucursal.dto';
import { InventarioSucursal } from './entities/inventario_sucursal.entity';

@Injectable()
export class InventariosSucursalesService {
  constructor(
    @InjectRepository(InventarioSucursal)
    private readonly inventariosRepository: Repository<InventarioSucursal>,
  ) {}

  async create(
    createInventarioSucursalDto: CreateInventarioSucursalDto,
  ): Promise<InventarioSucursal> {
    const nuevoInventario = this.inventariosRepository.create(
      createInventarioSucursalDto,
    );
    return this.inventariosRepository.save(nuevoInventario);
  }

  async findAll(): Promise<InventarioSucursal[]> {
    return this.inventariosRepository.find({
      relations: ['producto', 'sucursal'],
    });
  }

  async findOne(id: number): Promise<InventarioSucursal> {
    const inventario = await this.inventariosRepository.findOne({
      where: { id },
      relations: ['producto', 'sucursal'],
    });
    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return inventario;
  }

  async findBySucursal(idSucursal: number): Promise<InventarioSucursal[]> {
    const inventarios = await this.inventariosRepository.find({
      where: { idSucursal },
      relations: ['producto'],
    });
    if (!inventarios.length) {
      throw new NotFoundException(
        `No se encontró inventario para la sucursal con ID ${idSucursal}`,
      );
    }
    return inventarios;
  }

  async update(
    id: number,
    updateInventarioSucursalDto: UpdateInventarioSucursalDto,
  ): Promise<{ message: string; inventario: InventarioSucursal }> {
    const inventario = await this.findOne(id);
    if (updateInventarioSucursalDto.idProducto) {
      inventario.idProducto = updateInventarioSucursalDto.idProducto;
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
