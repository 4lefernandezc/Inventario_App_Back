import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellido no debe ser vacío' })
  @IsString({ message: 'El campo apellido debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo apellido no debe ser mayor a 100 caracteres',
  })
  readonly apellido: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(15, {
    message: 'El campo telefono no debe ser mayor a 15 caracteres',
  })
  @MinLength(4, { message: 'El campo telefono  debe ser mayor a 4 caracteres' })
  readonly telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo link whatsapp debe ser de tipo cadena' })
  @MaxLength(255, {
    message: 'El campo link whatsapp no debe ser mayor a 255 caracteres',
  })
  readonly linkWhatsapp?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo activo no debe ser vacío' })
  @IsBoolean({ message: 'El campo activo debe ser de tipo booleano' })
  readonly activo: boolean;
}