import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Min,
  MaxLength,
  IsDefined,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateInventarioSucursalDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo id_ingrediente debe estar definido' })
  @IsNumber({}, { message: 'El campo id_ingrediente debe ser de tipo numérico' })
  readonly idIngrediente: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo id_sucursal debe estar definido' })
  @IsNumber({}, { message: 'El campo id_sucursal debe ser de tipo numérico' })
  readonly idSucursal: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo stock actual es obligatorio' })
  @IsNumber({}, { message: 'El campo stock actual debe ser de tipo numero' })
  @IsInt()
  @Min(0, { message: 'El stock actual no puede ser negativo.' })
  readonly stockActual: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo stock minimo es obligatorio' })
  @IsNumber({}, { message: 'El campo stock minimo debe ser de tipo numero' })
  @IsInt()
  @Min(0, { message: 'El stock mínimo no puede ser negativo.' })
  readonly stockMinimo: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El campo stock maximo debe ser de tipo numero' })
  @IsInt()
  @Min(0, { message: 'El stock máximo no puede ser negativo.' })
  readonly stockMaximo?: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tipo_unidad es obligatorio' })
  @IsString({ message: 'El campo tipo_unidad debe ser de tipo cadena' })
  @MaxLength(150, {
    message: 'El campo tipo_unidad no debe ser mayor a 255 caracteres',
  })
  readonly tipoUnidad: string;
}
