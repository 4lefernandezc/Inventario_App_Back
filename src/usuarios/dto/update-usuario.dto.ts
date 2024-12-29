import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo clave es obligatorio' })
  @IsString({ message: 'El campo clave debe ser tipo cadena' })
  @MaxLength(255, {
    message: 'El campo clave no debe ser mayor a 255 caracteres',
  })
  readonly clave: string;
}
