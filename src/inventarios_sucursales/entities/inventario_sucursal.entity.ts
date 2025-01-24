import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { Sucursal } from 'src/sucursales/entities/sucursal.entity';

@Entity('inventarios_sucursales')
export class InventarioSucursal {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_ingrediente' })
  idIngrediente: number;

  @Column('integer', { name: 'id_sucursal' })
  idSucursal: number;

  @Column('integer', { name: 'stock_actual' })
  stockActual: number;

  @Column('integer', { name: 'stock_minimo', default: 0 })
  stockMinimo: number;

  @Column('integer', { name: 'stock_maximo', nullable: true })
  stockMaximo?: number;

  @Column('varchar', { length: 50, name: 'tipo_unidad' })
  tipoUnidad: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Ingrediente, (ingrediente) => ingrediente.inventarios)
  @JoinColumn({ name: 'id_ingrediente', referencedColumnName: 'id' })
  ingrediente: Ingrediente;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.inventarios)
  @JoinColumn({ name: 'id_sucursal', referencedColumnName: 'id' })
  sucursal: Sucursal;
}
