import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const existingCategoria = await this.categoriasRepository.findOneBy({ nombre: createCategoriaDto.nombre.trim() });
    if (existingCategoria) {
      throw new BadRequestException(`La categoria con el nombre proporcionado ya existe`);
    }

    const categoria = this.categoriasRepository.create({
      nombre: createCategoriaDto.nombre.trim(),
      descripcion: createCategoriaDto.descripcion?.trim() || null,
      activo: createCategoriaDto.activo
    });
    return this.categoriasRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({ id });
    if (!categoria) { throw new NotFoundException(`La categoria con el id proporcionado no existe`)}
    return categoria;
  }

  async update( id: number, updateCategoriaDto: UpdateCategoriaDto ): Promise<{ message: string; categoria: Categoria }> {
    const categoria = await this.findOne(id);
    const categoriaUpdate = Object.assign(categoria, updateCategoriaDto);
    const updatedCategoria =
      await this.categoriasRepository.save(categoriaUpdate);
    return {
      message: 'La categoria ha sido actualizada exitosamente',
      categoria: updatedCategoria,
    };
  }

  async remove(id: number): Promise<{ message: string; categoria: Categoria }> {
    const categoria = await this.findOne(id);
    await this.categoriasRepository.remove(categoria);
    return {
      message: 'La categoria ha sido eliminada exitosamente',
      categoria: categoria,
    };
  }
}
