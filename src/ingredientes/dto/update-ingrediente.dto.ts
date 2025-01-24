import { PartialType } from '@nestjs/swagger';
import { CreateProductoDto } from './create-ingrediente.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
