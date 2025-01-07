import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventariosSucursalesService } from './inventarios_sucursales.service';
import { CreateInventarioSucursalDto } from './dto/create-inventario_sucursal.dto';
import { UpdateInventarioSucursalDto } from './dto/update-inventario_sucursal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

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
  findAll() {
    return this.inventariosSucursalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventariosSucursalesService.findOne(+id);
  }

  @Get('sucursal/:idSucursal')
  findBySucursal(@Param('idSucursal') idSucursal: string) {
    return this.inventariosSucursalesService.findBySucursal(+idSucursal);
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
