import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 250, nullable: true })
  descripcion?: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
