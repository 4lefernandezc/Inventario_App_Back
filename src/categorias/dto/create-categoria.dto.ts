import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser menor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripción no debe ser vacío' })
  @IsString({ message: 'El campo descripción debe ser de tipo cadena' })
  @MaxLength(255, {
    message: 'El campo descripción no debe ser menor a 255 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo activo no debe ser vacío' })
  readonly activo: boolean;
}
