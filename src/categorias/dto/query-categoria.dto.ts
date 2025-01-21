import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { GetPaginationSortParamsDto } from 'src/common/dto/get-pagination-sort-params.dto';

export class QueryCategoriaDto extends GetPaginationSortParamsDto {
  @ApiPropertyOptional({ example: 'Herramientas' })
  @IsOptional()
  @IsString()
  readonly nombre?: string;
  
  @ApiPropertyOptional({ example: 'Esta es mi categoria' })
  @IsOptional()
  @IsString()
  readonly descripcion?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return value === 'true' || value === true;
  })
  readonly activo?: boolean;
}