import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { GetPaginationSortParamsDto } from 'src/common/dto/get-pagination-sort-params.dto';

export class QueryRecetaDto extends GetPaginationSortParamsDto {
  @ApiPropertyOptional({ example: 'Torta Personalizada de Chocolate' })
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @ApiPropertyOptional({ example: 200 })
  @IsOptional()
  @IsNumber()
  readonly precioBase?: number;
}