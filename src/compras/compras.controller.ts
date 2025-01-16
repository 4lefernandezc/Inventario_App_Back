import { Controller, Get, Post, Param, Body, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { Compra } from './entities/compra.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Compras')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get()
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de todas las compras',
    type: [Compra]
  })
  async obtenerCompras(): Promise<Compra[]> {
    return this.comprasService.obtenerCompras();
  }

  @Get(':id')
  @ApiResponse({ 
    status: 200, 
    description: 'Detalle de una compra específica',
    type: Compra
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Compra no encontrada' 
  })
  async obtenerCompraPorId(@Param('id', ParseIntPipe) id: number): Promise<Compra> {
    return this.comprasService.obtenerCompraPorId(id);
  }

  @Post()
  @ApiResponse({ 
    status: 201, 
    description: 'Compra creada exitosamente',
    type: Compra
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos' 
  })
  async crearCompra(@Body() createCompraDto: CreateCompraDto): Promise<Compra> {
    return this.comprasService.crearCompra(createCompraDto);
  }

  @Delete(':id')
  @ApiResponse({ 
    status: 200, 
    description: 'Compra anulada exitosamente',
    type: Compra
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Compra no encontrada' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'La compra ya está anulada' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error al anular la compra' 
  })
  async anularCompraPorId(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Compra> {
    return this.comprasService.anularCompra(id);
  }
}