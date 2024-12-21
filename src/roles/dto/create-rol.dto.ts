import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRolDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo string' })
  @MaxLength(50, {
    message:
      'El campo nombre debe tener una longitud máxima de 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
  @IsString({ message: 'El campo descripcion debe ser de tipo string' })
  @MaxLength(255, {
    message:
      'El campo descripcion debe tener una longitud máxima de 255 caracteres',
  })
  readonly descripcion: string;
}
