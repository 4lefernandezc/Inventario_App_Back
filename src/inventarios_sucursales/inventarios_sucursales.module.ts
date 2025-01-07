import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventariosSucursalesService } from './inventarios_sucursales.service';
import { InventariosSucursalesController } from './inventarios_sucursales.controller';
import { InventarioSucursal } from './entities/inventario_sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventarioSucursal])],
  controllers: [InventariosSucursalesController],
  providers: [InventariosSucursalesService],
})
export class InventariosSucursalesModule {}
