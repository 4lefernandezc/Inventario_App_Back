import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventariosSucursalesService } from './inventarios_sucursales.service';
import { CreateInventarioSucursalDto } from './dto/create-inventario_sucursal.dto';
import { UpdateInventarioSucursalDto } from './dto/update-inventario_sucursal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { QueryInventarioSucursalDto } from './dto/query-inventario_sucursal.dto';

@ApiTags('Inventarios_Sucursales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventarios-sucursales')
export class InventariosSucursalesController {
  constructor(private readonly inventariosSucursalesService: InventariosSucursalesService) {}

  @Post()
  create(@Body() createInventarioSucursalDto: CreateInventarioSucursalDto) {
    return this.inventariosSucursalesService.create(createInventarioSucursalDto);
  }

  @Get()
  findAll(@Query() query: QueryInventarioSucursalDto) {
    return this.inventariosSucursalesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventariosSucursalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventarioSucursalDto: UpdateInventarioSucursalDto) {
    return this.inventariosSucursalesService.update(+id, updateInventarioSucursalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventariosSucursalesService.remove(+id);
  }
}
