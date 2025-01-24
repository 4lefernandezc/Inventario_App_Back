import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Min,
  MaxLength,
  IsDefined,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
export class CreateMovimientoInventarioDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo id_ingrediente debe estar definido' })
  @IsInt({ message: 'El id_ingrediente debe ser un número entero' })
  readonly idIngrediente: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo id_sucursal debe estar definido' })
  @IsInt({ message: 'El id_sucursal debe ser un número entero' })
  readonly idSucursal: number;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'El tipo de movimiento es obligatorio' })
  @IsString({ message: 'El tipo de movimiento debe ser una cadena' })
  @MaxLength(50, {
    message: 'El tipo de movimiento no debe exceder 50 caracteres',
  })
  readonly tipoMovimiento: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser mayor a 0' })
  readonly cantidad: number;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'El motivo es obligatorio' })
  @IsString({ message: 'El motivo debe ser una cadena' })
  @MaxLength(50, { message: 'El motivo no debe exceder 50 caracteres' })
  readonly motivo: string;
  
  @ApiProperty()
  @IsDefined({ message: 'El campo id_usuario debe estar definido' })
  @IsInt({ message: 'El id_usuario debe ser un número entero' })
  readonly idUsuario: number;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'El id_sucursal_destino debe ser un número entero' })
  readonly idSucursalDestino?: number;
}
