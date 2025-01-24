import { Module } from '@nestjs/common';
import { IngredientesService } from './ingredientes.service';
import { ProductosController } from './ingredientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingrediente } from './entities/ingrediente.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingrediente, Proveedor])],
  controllers: [ProductosController],
  providers: [IngredientesService],
  exports: [TypeOrmModule.forFeature([Ingrediente])],
})
export class ProductosModule {}
