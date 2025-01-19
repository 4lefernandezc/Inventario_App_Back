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
      tipoDocumento: createClienteDto.tipoDocumento.trim(),
      nombre: createClienteDto.nombre.trim(),
      apellido: createClienteDto.apellido.trim(),
      direccion: createClienteDto.direccion?.trim() || null,
      telefono: createClienteDto.telefono?.trim() || null,
      correo: createClienteDto.correo?.trim() || null,
      activo: createClienteDto.activo,
      linkWhatsapp: linkWhatsApp,
    });

    return this.clientesRepository.save(cliente);
  }

  async findAll(q: QueryClienteDto){
    const { page, limit } = q;
    const query = this.clientesRepository.createQueryBuilder('clientes').select([
        'clientes.id',
        'clientes.documento',
        'clientes.tipoDocumento',
        'clientes.nombre',
        'clientes.apellido',
        'clientes.direccion',
        'clientes.telefono',
        'clientes.linkWhatsapp',
        'clientes.correo',
        'clientes.activo',
        'clientes.fechaCreacion',
        'clientes.fechaModificacion',
      ])

    if (q.nombre) {
      query.andWhere('clientes.nombre ILIKE :nombre', {
        nombre: `%${q.nombre}%`,
      });
    }

    if (q.apellido) {
      query.andWhere('clientes.apellido ILIKE :apellido', {
        apellido: `%${q.apellido}%`,
      });
    }

    if (q.documento) {
      query.andWhere('clientes.documento ILIKE :documento', {
        documento: `%${q.documento}%`,
      });
    }

    if (q.tipoDocumento) {
      query.andWhere('clientes.tipoDocumento ILIKE :tipoDocumento', {
        tipoDocumento: `%${q.tipoDocumento}%`,
      });
    }

    if (q.telefono) {
      query.andWhere('clientes.telefono ILIKE :telefono', {
        telefono: `%${q.telefono}%`,
      });
    }

    if (q.correo) {
      query.andWhere('clientes.correo ILIKE :correo', {
        correo: `%${q.correo}%`,
      });
    }

    if (q.activo !== undefined) {
      query.andWhere('clientes.activo = :activo', {
        activo: q.activo,
      });
    }

    if (q.sidx) {
      query.orderBy(`clientes.id`, q.sord);
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

  async update( id: number, updateClienteDto: UpdateClienteDto ): Promise<{ message: string; cliente: Cliente }> {
    const cliente = await this.findOne(id);
    const clienteUpdate = Object.assign(cliente, updateClienteDto);
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
