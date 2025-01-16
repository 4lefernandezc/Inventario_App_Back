import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedoresRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const existingProveedorByName = await this.proveedoresRepository.findOneBy({ nombre: createProveedorDto.nombre.trim() });
    if (existingProveedorByName) {
      throw new BadRequestException(`El proveedor con el nombre proporcionado ya existe`);
    }

    const existingProveedorByNit = await this.proveedoresRepository.findOneBy({ nit: createProveedorDto.nit.trim() });
    if (existingProveedorByNit) {
      throw new BadRequestException(`El proveedor con el NIT proporcionado ya existe`);
    }

    const linkWhatsApp = createProveedorDto.telefono
    ? `https://wa.me/${createProveedorDto.telefono.trim()}`
    : null;

    const proveedor = this.proveedoresRepository.create({
      nombre: createProveedorDto.nombre.trim(),
      nit: createProveedorDto.nit.trim(),
      telefono: createProveedorDto.telefono,
      direccion: createProveedorDto.direccion?.trim() || null,
      correo: createProveedorDto.correo?.trim() || null,
      activo: createProveedorDto.activo,
      linkWhatsapp: linkWhatsApp,
    });
    return this.proveedoresRepository.save(proveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedoresRepository.find();
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedoresRepository.findOneBy({ id });
    if (!proveedor) {
      throw new NotFoundException(`El proveedor con el id proporcionado no existe`);
    }
    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto): Promise<{ message: string; proveedor: Proveedor }> {
    const proveedor = await this.findOne(id);
    const proveedorUpdate = Object.assign(proveedor, updateProveedorDto);
    const updatedProveedor = await this.proveedoresRepository.save(proveedorUpdate);
    return {
      message: 'El proveedor ha sido actualizado exitosamente',
      proveedor: updatedProveedor,
    };
  }

  async remove(id: number): Promise<{ message: string; proveedor: Proveedor }> {
    const proveedor = await this.findOne(id);
    await this.proveedoresRepository.remove(proveedor);
    return {
      message: 'El proveedor ha sido eliminado exitosamente',
      proveedor: proveedor,
    };
  }
}
