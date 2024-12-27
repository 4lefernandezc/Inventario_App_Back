import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column('varchar', { length: 255 })
  direccion: string;

  @Column('varchar', { length: 255 })
  correo: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  // @OneToMany(() => Compra, (compra) => compra.proveedor)
  // compras: Compra[];
}
