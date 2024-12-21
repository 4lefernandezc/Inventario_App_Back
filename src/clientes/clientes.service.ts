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

    const cliente = this.clientesRepository.create({
      documento: createClienteDto.documento.trim(),
      tipoDocumento: createClienteDto.tipoDocumento.trim(),
      nombre: createClienteDto.nombre.trim(),
      direccion: createClienteDto.direccion.trim(),
      telefono: createClienteDto.telefono.trim(),
      correo: createClienteDto.correo.trim(),
      activo: createClienteDto.activo,
    });

    return this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
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
