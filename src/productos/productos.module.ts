import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria, Proveedor])],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [TypeOrmModule.forFeature([Producto])],
})
export class ProductosModule {}
