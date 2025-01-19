import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CloseCajaDto {
  @ApiProperty({ description: 'ID del usuario que cierra la caja', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  idUsuarioCierre: number;
}