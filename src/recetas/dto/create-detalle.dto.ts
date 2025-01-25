import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DetalleRecetaCreateDto {
  @ApiProperty({ description: 'ID del ingrediente', example: 1 })
  @IsNotEmpty({ message: 'El campo idIngrediente es obligatorio' })
  @IsNumber({}, { message: 'El campo idIngrediente debe ser numérico' })
  readonly idIngrediente: number;

  @ApiProperty({ description: 'Cantidad', example: 2 })
  @IsNotEmpty({ message: 'El campo cantidad es obligatorio' })
  @IsNumber({}, { message: 'El campo cantidad debe ser numérico' })
  readonly cantidad: number;
}