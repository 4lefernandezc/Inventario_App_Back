import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { GetPaginationSortParamsDto } from 'src/common/dto/get-pagination-sort-params.dto';

export class QuerySucursalDto extends GetPaginationSortParamsDto {
  @ApiPropertyOptional({ example: 'Sucursal Tarija' })
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @ApiPropertyOptional({ example: 'Av. Tarija #48' })
  @IsOptional()
  @IsString()
  readonly direccion?: string;

  @ApiPropertyOptional({ example: '7892345' })
  @IsOptional()
  @IsString()
  readonly telefono?: string;

  @ApiPropertyOptional({ example: 'sucursal@gmail.com' })
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