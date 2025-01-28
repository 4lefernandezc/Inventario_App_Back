import { Receta } from 'src/recetas/entities/receta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 25 })
  documento: string;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 100 })
  apellido: string;

  @Column('varchar', { length: 15, nullable: true })
  telefono?: string;

  @Column('varchar', { length: 255, nullable: true, name: 'link_whatsapp' })
  linkWhatsapp?: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => Receta, (receta) => receta.cliente)
  recetas: Receta[];
}