import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCajaDto {
  @ApiProperty({ description: 'Monto inicial de la caja', example: 1000.00 })
  @IsNotEmpty()
  @IsNumber()
  montoInicial: number;

  @ApiProperty({ description: 'ID del usuario que abre la caja', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  idUsuarioApertura: number;

  @ApiProperty({ description: 'ID de la sucursal', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  idSucursal: number;
}