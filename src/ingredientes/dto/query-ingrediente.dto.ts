import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetPaginationSortParamsDto } from 'src/common/dto/get-pagination-sort-params.dto';

export class QueryProductoDto extends GetPaginationSortParamsDto {
  @ApiPropertyOptional({ example: 'P-001' })
  @IsOptional()
  @IsString()
  readonly codigo?: string;

  @ApiPropertyOptional({ example: 'Leche' })
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @ApiPropertyOptional({ example: 'Bolsa de leche Liquida' })
  @IsOptional()
  @IsString()
  readonly descripcion?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  readonly precioCompra?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  readonly idProveedor?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return value === 'true' || value === true;
  })
  readonly activo?: boolean;
}
