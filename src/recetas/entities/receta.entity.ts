import { DetalleReceta } from './detalle_receta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recetas')
export class Receta {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 150 })
  nombre: string;

  @Column('varchar', { length: 250, nullable: true })
  descripcion?: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_base' })
  precioBase: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'monto_total', nullable: true })
  montoTotal?: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => DetalleReceta, (detalleReceta) => detalleReceta.receta, { cascade: true })
  detallesReceta: DetalleReceta[];
}