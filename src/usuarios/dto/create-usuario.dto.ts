import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo usuario es obligatorio' })
  @IsString({ message: 'El campo usuario debe ser tipo cadena' })
  @MaxLength(20, {
    message: 'El campo usuario no debe ser mayor a 20 caracteres',
  })
  readonly usuario: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo rol es obligatorio' })
  @IsString({ message: 'El campo rol debe ser tipo cadena' })
  @MaxLength(30, {
    message: 'El campo rol no debe ser mayor a 30 caracteres',
  })
  readonly rol: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo premium debe estar definido' })
  @IsBooleanString({ message: 'El campo premium debe ser de tipo lógico' })
  readonly premium: boolean;
}
