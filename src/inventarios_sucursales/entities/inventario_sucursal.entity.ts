import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Sucursal } from 'src/sucursales/entities/sucursal.entity';

@Entity('inventarios_sucursales')
export class InventarioSucursal {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_producto' })
  idProducto: number;

  @Column('integer', { name: 'id_sucursal' })
  idSucursal: number;

  @Column('integer', { name: 'stock_actual', default: 0 })
  stockActual: number;

  @Column('integer', { name: 'stock_minimo', default: 0 })
  stockMinimo: number;

  @Column('varchar', { length: 50, name: 'tipo_unidad' })
  tipoUnidad: string;

  @Column('varchar', { length: 50 })
  ubicacion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Producto, (producto) => producto.inventarios)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.inventarios)
  @JoinColumn({ name: 'id_sucursal', referencedColumnName: 'id' })
  sucursal: Sucursal;
}
