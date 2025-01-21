import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { GetPaginationSortParamsDto } from 'src/common/dto/get-pagination-sort-params.dto';

export class QueryRolDto extends GetPaginationSortParamsDto {
  @ApiPropertyOptional({ example: 'Administrador' })
  @IsOptional()
  @IsString()
  readonly nombre?: string;
  
  @ApiPropertyOptional({ example: 'Acceso total al sistema' })
  @IsOptional()
  @IsString()
  readonly descripcion?: string;
}