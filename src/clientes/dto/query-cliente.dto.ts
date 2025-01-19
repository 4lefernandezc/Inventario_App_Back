import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetPaginationSortParamsDto } from 'src/common/dto/get-pagination-sort-params.dto';

export class QueryClienteDto extends GetPaginationSortParamsDto {
  @ApiPropertyOptional({ example: 'Nombre del Cliente' })
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @ApiPropertyOptional({ example: 'Apellido del Cliente' })
  @IsOptional()
  @IsString()
  readonly apellido?: string;

  @ApiPropertyOptional({ example: '123456789' })
  @IsOptional()
  @IsString()
  readonly documento?: string;

  @ApiPropertyOptional({ example: 'CC' })
  @IsOptional()
  @IsString()
  readonly tipoDocumento?: string;

  @ApiPropertyOptional({ example: '7656456' })
  @IsOptional()
  @IsString()
  readonly telefono?: string;
  
  @ApiPropertyOptional({ example: 'ejemplo@gmail.com' })
  @IsOptional()
  @IsString()
  readonly correo?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return value === 'true' || value === true;
  })
  readonly activo?: boolean;
}
