import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'La contraseña actual debe tener al menos 6 caracteres.' })
  @MaxLength(20, { message: 'La contraseña actual no debe exceder los 20 caracteres.' })
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(20, { message: 'La nueva contraseña no debe exceder los 20 caracteres.' })
  newPassword: string;
}
