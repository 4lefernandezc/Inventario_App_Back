import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { Receta } from './receta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalles_recetas')
export class DetalleReceta {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_receta' })
  idReceta: number;

  @Column('integer', { name: 'id_ingrediente' })
  idIngrediente: number;

  @Column('integer')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'subtotal', nullable: true })
  subtotal?: number;

  @ManyToOne(() => Receta, (receta) => receta.detallesReceta)
  @JoinColumn({ name: 'id_receta', referencedColumnName: 'id' })
  receta: Receta;

  @ManyToOne(() => Ingrediente)
  @JoinColumn({ name: 'id_ingrediente', referencedColumnName: 'id' })
  ingrediente: Ingrediente;
}