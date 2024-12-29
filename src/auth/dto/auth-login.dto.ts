import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuario es obligatorio' })
  @IsString({ message: 'El campo usuario debe ser tipo cadena' })
  @MaxLength(20, {
    message: 'El campo usuario no debe ser mayor a 20 caracteres',
  })
  usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Clave/Contraseña no debe ser vacío' })
  @IsString({ message: 'El campo Clave/Contraseña debe ser de tipo cadena' })
  clave: string;
}
