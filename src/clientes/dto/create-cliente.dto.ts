import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo documento no debe ser vacío' })
  @IsString({ message: 'El campo documento debe ser de tipo cadena' })
  @MaxLength(25, {
    message: 'El campo documento no debe ser mayor a 25 caracteres',
  })
  @MinLength(4, {
    message: 'El campo documento  debe ser mayor a 4 caracteres',
  })
  readonly documento: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tipo documento no debe ser vacío' })
  @IsString({ message: 'El campo tipo documento debe ser de tipo cadena' })
  @MaxLength(25, {
    message: 'El campo tipo documento no debe ser mayor a 25 caracteres',
  })
  @MinLength(4, {
    message: 'El campo tipo documento  debe ser mayor a 4 caracteres',
  })
  readonly tipoDocumento: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo nombre no debe ser nemor a 255 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo dirección no debe ser vacío' })
  @IsString({ message: 'El campo dirección debe ser de tipo cadena' })
  @MaxLength(255, {
    message: 'El campo dirección no debe ser nemor a 255 caracteres',
  })
  readonly direccion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacío' })
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(15, {
    message: 'El campo telefono no debe ser mayor a 15 caracteres',
  })
  @MinLength(4, { message: 'El campo telefono  debe ser mayor a 4 caracteres' })
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo correo no debe ser vacío' })
  @IsString({ message: 'El campo correo debe ser de tipo cadena' })
  @IsEmail({}, { message: 'El campo correo debe ser un correo electrónico' })
  @MaxLength(255, {
    message: 'El campo correo no debe ser nemor a 255 caracteres',
  })
  readonly correo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo activo no debe ser vacío' })
  @IsBoolean({ message: 'El campo activo debe ser de tipo booleano' })
  readonly activo: boolean;
}
