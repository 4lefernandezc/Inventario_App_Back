import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';
// import { Detallecompra } from 'src/detallecompras/entities/detallecompra.entity';
// import { Detalleventa } from 'src/detalleventa/entities/detalleventa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  codigo: string;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 255 })
  descripcion: string;

  @Column('integer', { name: 'id_categoria' })
  idCategoria: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_compra' })
  precioCompra: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_venta' })
  precioVenta: number;

  @Column('boolean')
  activo: boolean;

  @Column('integer', { name: 'id_proveedor' })
  idProveedor: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'id_proveedor', referencedColumnName: 'id' })
  proveedor: Proveedor;

//   @OneToMany(() => Detallecompra, (detallecompra) => detallecompra.producto)
//   detallecompras: Detallecompra[];

//   @OneToMany(() => Detalleventa, (detalleventas) => detalleventas.producto)
//   detalleventas: Detalleventa[];
}

