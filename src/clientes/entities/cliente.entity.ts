import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 25 })
  documento: string;

  @Column('varchar', { length: 25, name: 'tipo_documento' })
  tipoDocumento: string;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 100 })
  apellido: string;

  @Column('varchar', { length: 255, nullable: true })
  direccion?: string;

  @Column('varchar', { length: 15, nullable: true })
  telefono?: string;

  @Column('varchar', { length: 255, nullable: true })
  correo?: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  // @OneToMany(() => Venta, (venta) => venta.cliente)
  // ventas: Venta[];
}
