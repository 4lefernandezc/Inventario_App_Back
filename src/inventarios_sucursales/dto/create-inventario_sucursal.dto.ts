import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Min,
  IsOptional,
  MaxLength,
  IsDefined,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateInventarioSucursalDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo id_producto debe estar definido' })
  @IsNumber({}, { message: 'El campo id_producto debe ser de tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo id_sucursal debe estar definido' })
  @IsNumber({}, { message: 'El campo id_sucursal debe ser de tipo numérico' })
  readonly idSucursal: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo stock actual es obligatorio' })
  @IsNumber({}, { message: 'El campo stock actual debe ser de tipo numero' })
  @IsInt()
  @Min(0, { message: 'El stock actual no puede ser negativo.' })
  stockActual: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo stock minimo es obligatorio' })
  @IsNumber({}, { message: 'El campo stock minimo debe ser de tipo numero' })
  @IsInt()
  @Min(0, { message: 'El stock mínimo no puede ser negativo.' })
  stockMinimo: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tipo_unidad es obligatorio' })
  @IsString({ message: 'El campo tipo_unidad debe ser de tipo cadena' })
  @MaxLength(150, {
    message: 'El campo tipo_unidad no debe ser mayor a 255 caracteres',
  })
  tipoUnidad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo ubicacion es obligatorio' })
  @IsString({ message: 'El campo ubicacion debe ser de tipo cadena' })
  @MaxLength(150, {
    message: 'El campo ubicacion no debe ser mayor a 255 caracteres',
  })
  ubicacion?: string;
}
