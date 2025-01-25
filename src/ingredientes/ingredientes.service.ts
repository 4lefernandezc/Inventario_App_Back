import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-ingrediente.dto';
import { UpdateProductoDto } from './dto/update-ingrediente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingrediente } from './entities/ingrediente.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { QueryProductoDto } from './dto/query-ingrediente.dto';

@Injectable()
export class IngredientesService {
  constructor(
    @InjectRepository(Ingrediente)
    private productosRepository: Repository<Ingrediente>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Ingrediente> {
    const codigoExiste = await this.productosRepository.findOneBy({
      codigo: createProductoDto.codigo.trim(),
    });

    if (codigoExiste) {
      throw new ConflictException('El ingrediente con ese código ya existe');
    }

    const nombreExiste = await this.productosRepository.findOneBy({
      nombre: createProductoDto.nombre.trim(),
    });

    if (nombreExiste) {
      throw new ConflictException('El ingrediente con ese nombre ya existe');
    }

    const proveedorExiste = await this.productosRepository.manager.findOne(Proveedor, {
      where: { id: createProductoDto.idProveedor },
    });

    if (!proveedorExiste) {
      throw new NotFoundException('El proveedor con ese id no existe');
    }

    const ingrediente = new Ingrediente();
    ingrediente.codigo = createProductoDto.codigo.trim();
    ingrediente.nombre = createProductoDto.nombre.trim();
    ingrediente.descripcion = createProductoDto.descripcion?.trim() || null;
    ingrediente.precioCompra = createProductoDto.precioCompra;
    ingrediente.activo = createProductoDto.activo;
    ingrediente.proveedor = proveedorExiste;
    return this.productosRepository.save(ingrediente);
  }

  async findAll(q: QueryProductoDto) {
    const {
      page,
      limit,
      codigo,
      nombre,
      descripcion,
      precioCompra,
      idProveedor,
      activo,
      sidx,
      sord,
    } = q;

    const query = this.productosRepository.createQueryBuilder('ingredientes').select([
      'ingredientes.id',
      'ingredientes.codigo',
      'ingredientes.nombre',
      'ingredientes.descripcion',
      'ingredientes.precioCompra',
      'ingredientes.activo',
      'ingredientes.idProveedor',
      'ingredientes.fechaCreacion',
      'ingredientes.fechaModificacion',
    ])
    .leftJoinAndSelect('ingredientes.proveedor', 'proveedor');

    if (codigo) {
      query.andWhere('ingredientes.codigo ILIKE :codigo', {
        codigo: `%${codigo}%`,
      });
    }

    if (nombre) {
      query.andWhere('ingredientes.nombre ILIKE :nombre', {
        nombre: `%${nombre}%`,
      });
    }

    if (descripcion) {
      query.andWhere('ingredientes.descripcion ILIKE :descripcion', {
        descripcion: `%${descripcion}%`,
      });
    } 

    if (precioCompra) {
      query.andWhere('ingredientes.precioCompra = :precioCompra', {
        precioCompra,
      });
    }

    if (idProveedor) {
      query.andWhere('ingredientes.idProveedor = :idProveedor', {
        idProveedor,
      });
    }

    if (activo !== undefined) {
      query.andWhere('ingredientes.activo = :activo', {
        activo,
      });
    }

    if (sidx) {
      query.orderBy(`ingredientes.${sidx}`, sord);
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

  async findOne(id: number): Promise<Ingrediente> {
    const ingrediente = await this.productosRepository.findOne({
      where: { id },
      relations: ['categoria', 'proveedor'],
    });
    if (!ingrediente) {
      throw new NotFoundException(
        `El Productocon el id #${id} no se encuentra`,
      );
    }
    return ingrediente;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<{ message: string; ingrediente: Ingrediente }> {
    const ingrediente = await this.findOne(id);

    if (updateProductoDto.idProveedor) {
      ingrediente.proveedor = { id: updateProductoDto.idProveedor } as Proveedor;
    }

    const updatedProducto = Object.assign(ingrediente, updateProductoDto);
    await this.productosRepository.save(updatedProducto);
    return {
      message: 'Ingrediente actualizado exitosamente',
      ingrediente: updatedProducto,
    };
  }

  async remove(id: number): Promise<{ message: string; ingrediente: Ingrediente }> {
    const ingrediente = await this.findOne(id);
    await this.productosRepository.remove(ingrediente);
    return {
      message: 'Ingrediente eliminado exitosamente',
      ingrediente,
    };
  }
}
