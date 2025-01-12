import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRolDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo string' })
  @MaxLength(50, {
    message:
      'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El campo descripcion debe ser de tipo string' })
  @MaxLength(255, {
    message:
      'El campo descripcion no debe ser mayor a 255 caracteres',
  })
  readonly descripcion?: string;
}
