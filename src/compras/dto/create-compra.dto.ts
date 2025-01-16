import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DetalleCompraDto {
  @ApiProperty({ description: 'ID del producto', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  idProducto: number;

  @ApiProperty({ description: 'Cantidad del producto', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @ApiProperty({ description: 'Descuento aplicado al producto', example: 10.0, nullable: true })
  @IsNumber()
  @IsOptional()
  descuento: number;
}

export class CreateCompraDto {
  @ApiProperty({ description: 'ID del proveedor asociado a la compra', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  idProveedor: number;

  @ApiProperty({ description: 'Método de pago utilizado', example: 'efectivo' })
  @IsString()
  @IsNotEmpty()
  metodoPago: string;

  @ApiProperty({ description: 'ID del usuario que realiza la compra', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @ApiProperty({ description: 'ID de la sucursal donde se realiza la compra', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  idSucursal: number;

  @ApiProperty({
    description: 'Detalles de los productos comprados',
    type: [DetalleCompraDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleCompraDto)
  detalles: DetalleCompraDto[];

  @ApiProperty({ description: 'Tipo de documento', example: 'COM', enum: ['COM', 'FAC'] })
  @IsString()
  @IsNotEmpty()
  tipoDocumento: string;
}