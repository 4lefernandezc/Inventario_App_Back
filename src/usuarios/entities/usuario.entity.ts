import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rol } from 'src/roles/entities/rol.entity';
import { Sucursal } from 'src/sucursales/entities/sucursal.entity';
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 20, unique: true })
  usuario: string;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 100 })
  apellido: string;

  @Column('varchar', { length: 255, nullable: true })
  correo?: string;

  @Column('varchar', { length: 20, nullable: true })
  telefono?: string;

  @Column('varchar', { length: 255, select: false })
  clave: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @Column({ name: 'ultimo_login', type: 'date' })
  ultimoLogin: Date;

  @Column('number', { name: 'rol_id' })
  rolId: number;

  @Column('number', { name: 'sucursal_id' })
  sucursalId: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { eager: true, nullable: false })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.usuarios, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Sucursal;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.clave && !this.clave.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.clave = await bcrypt.hash(this.clave, salt);
    }
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.clave);
  }
}