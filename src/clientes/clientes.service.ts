import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { QueryClienteDto } from './dto/query-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existingCliente = await this.clientesRepository.findOneBy({
      documento: createClienteDto.documento.trim(),
    });

    if (existingCliente) {
      throw new BadRequestException(`El cliente con el documento proporcionado ya existe`);
    }

    const linkWhatsApp = createClienteDto.telefono
      ? `https://wa.me/${createClienteDto.telefono.trim()}`
      : null;

    const cliente = this.clientesRepository.create({
      documento: createClienteDto.documento.trim(),
      nombre: createClienteDto.nombre.trim(),
      apellido: createClienteDto.apellido.trim(),
      telefono: createClienteDto.telefono?.trim() || null,
      activo: createClienteDto.activo,
      linkWhatsapp: linkWhatsApp,
    });

    return this.clientesRepository.save(cliente);
  }

  async findAll(q: QueryClienteDto) {
    const { page, limit, nombre, apellido, documento, telefono, activo, sidx, sord } = q;
    const query = this.clientesRepository.createQueryBuilder('clientes').select([
      'clientes.id',
      'clientes.documento',
      'clientes.nombre',
      'clientes.apellido',
      'clientes.telefono',
      'clientes.linkWhatsapp',
      'clientes.activo',
      'clientes.fechaCreacion',
      'clientes.fechaModificacion',
    ]);

    if (nombre) {
      query.andWhere('clientes.nombre ILIKE :nombre', {
        nombre: `%${nombre}%`,
      });
    }

    if (apellido) {
      query.andWhere('clientes.apellido ILIKE :apellido', {
        apellido: `%${apellido}%`,
      });
    }

    if (documento) {
      query.andWhere('clientes.documento ILIKE :documento', {
        documento: `%${documento}%`,
      });
    }

    if (telefono) {
      query.andWhere('clientes.telefono ILIKE :telefono', {
        telefono: `%${telefono}%`,
      });
    }

    if (activo !== undefined) {
      query.andWhere('clientes.activo = :activo', {
        activo,
      });
    }

    if (sidx) {
      query.orderBy(`clientes.${sidx}`, sord);
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

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`El cliente con el id proporcionado no existe`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<{ message: string; cliente: Cliente }> {
    const cliente = await this.findOne(id);
  
    if (updateClienteDto.documento) {
      const existingCliente = await this.clientesRepository.findOneBy({
        documento: updateClienteDto.documento.trim(),
      });
  
      if (existingCliente && existingCliente.id !== id) {
        throw new BadRequestException(`El cliente con el documento proporcionado ya existe`);
      }
    }
  
    const linkWhatsApp = updateClienteDto.telefono
      ? `https://wa.me/${updateClienteDto.telefono.trim()}`
      : cliente.linkWhatsapp;
  
    const clienteUpdate = Object.assign(cliente, {
      ...updateClienteDto,
      documento: updateClienteDto.documento?.trim(),
      nombre: updateClienteDto.nombre?.trim(),
      apellido: updateClienteDto.apellido?.trim(),
      telefono: updateClienteDto.telefono?.trim(),
      linkWhatsapp: linkWhatsApp,
    });
  
    const updatedCliente = await this.clientesRepository.save(clienteUpdate);
  
    return {
      message: 'El cliente ha sido actualizado exitosamente',
      cliente: updatedCliente,
    };
  }
  
  async remove(id: number): Promise<{ message: string; cliente: Cliente }> {
    const cliente = await this.findOne(id);
    await this.clientesRepository.remove(cliente);

    return {
      message: 'El cliente ha sido eliminado exitosamente',
      cliente: cliente,
    };
  }
}