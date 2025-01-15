import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QueryProductoDto } from './dto/query-producto.dto';

@ApiTags('Productos') // Swagger
@ApiBearerAuth() //lo de documentacion para loguear
@UseGuards(JwtAuthGuard) //lo de documentacion para loguear
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(@Query() query: QueryProductoDto) {
    return this.productosService.findAll(query);
  }

  @Get('categoria/:idCategoria')
  async getProductosByCategoria(
    @Param('idCategoria', ParseIntPipe) idCategoria: number ): Promise<Producto[]> {
    return this.productosService.findByCategoria(idCategoria);
  }

  @Get('proveedor/:idProveedor')
  async getProductosByProveedor(
    @Param('idProveedor', ParseIntPipe) idProveedor: number ): Promise<Producto[]> {
    return this.productosService.findByProveedor(idProveedor);
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
