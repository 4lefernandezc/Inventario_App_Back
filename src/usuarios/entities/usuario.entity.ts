// import { Compra } from 'src/compra/entities/compra.entity';
// import { Venta } from 'src/ventas/entities/venta.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt'; // para login
// import { Empleado } from 'src/empleados/entities/empleado.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 20 })
  usuario: string;

  @Column('varchar', { length: 250, select: false })
  clave: string;

  @Column('varchar', { length: 30 })
  rol: string;

  @Column('boolean')
  premium: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_elimanacion', select: false })
  fechaEliminacion: Date;

  // @OneToMany(() => Compra, (compra) => compra.usuario)
  // compras: Compra[];

  // @OneToMany(() => Venta, (venta) => venta.usuarios)
  // ventas: Venta[];

  // //Este esta listo....
  // @OneToMany(() => Empleado, (empleado) => empleado.usuarios)
  // empleados: Empleado[];

  //para login
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.clave = await bcrypt.hash(this.clave, salt);
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.clave);
  }
}
