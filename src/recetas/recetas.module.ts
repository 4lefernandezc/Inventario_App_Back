import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { Receta } from './entities/receta.entity';
import { DetalleReceta } from './entities/detalle_receta.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receta, DetalleReceta, Ingrediente, Cliente])],
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}