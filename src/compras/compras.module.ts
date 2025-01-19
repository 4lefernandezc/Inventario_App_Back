import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { Compra } from './entities/compra.entity';
import { DetalleCompra } from './entities/detalle_compra.entity';
import { Producto } from '../productos/entities/producto.entity';
import { InventarioSucursal } from '../inventarios_sucursales/entities/inventario_sucursal.entity';
import { Caja } from 'src/cajas/entities/caja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Compra,
      DetalleCompra,
      Producto,
      InventarioSucursal,
      Caja
    ])
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
  exports: [ComprasService]
})
export class ComprasModule {}