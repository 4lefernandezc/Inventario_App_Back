import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { QueryRecetaDto } from './dto/query-receta.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Recetas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  @ApiBody({
    type: CreateRecetaDto,
    description: 'Cuerpo de la solicitud para crear una nueva receta',
  })
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  findAll(@Query() query: QueryRecetaDto) {
    return this.recetasService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateRecetaDto: UpdateRecetaDto
  ) {
    return this.recetasService.update(+id, updateRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetasService.remove(+id);
  }
}