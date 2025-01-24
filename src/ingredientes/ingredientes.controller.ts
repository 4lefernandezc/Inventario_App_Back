import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { IngredientesService } from './ingredientes.service';
import { CreateProductoDto } from './dto/create-ingrediente.dto';
import { UpdateProductoDto } from './dto/update-ingrediente.dto';
import { Ingrediente } from './entities/ingrediente.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QueryProductoDto } from './dto/query-ingrediente.dto';

@ApiTags('Ingredientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ingredientes')
export class ProductosController {
  constructor(private readonly productosService: IngredientesService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(@Query() query: QueryProductoDto) {
    return this.productosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
