import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DetalleRecetaCreateDto } from './create-detalle.dto';

export class CreateRecetaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  readonly nombre: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly descripcion?: string;

  @ApiProperty({ example: 100.0 })
  @IsNotEmpty({ message: 'El campo precioBase es obligatorio' })
  @IsNumber({}, { message: 'El campo precioBase debe ser numérico' })
  readonly precioBase: number;

  @ApiProperty()
  @ArrayNotEmpty({ message: 'Debe incluir al menos un detalle de ingrediente' })
  @ValidateNested({ each: true })
  @Type(() => DetalleRecetaCreateDto)
  detalles: DetalleRecetaCreateDto[];
}