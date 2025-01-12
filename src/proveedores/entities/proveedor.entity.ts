import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 150 })
  nombre: string;

  @Column('varchar', { length: 50 })
  nit: string;

  @Column('varchar', { length: 15 })
  telefono: string;

  @Column('varchar', { length: 255, nullable: true })
  direccion?: string;

  @Column('varchar', { length: 255, nullable: true })
  correo?: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  // @OneToMany(() => Compra, (compra) => compra.proveedor)
  // compras: Compra[];
}
