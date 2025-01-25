import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { InventarioSucursal } from 'src/inventarios_sucursales/entities/inventario_sucursal.entity';
import { MovimientoInventario } from 'src/movimientos_inventarios/entities/movimientos_inventario.entity';
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
import { DetalleReceta } from 'src/recetas/entities/detalle_receta.entity';

@Entity('ingredientes')
export class Ingrediente {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  codigo: string;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 250, nullable: true })
  descripcion?: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_compra' })
  precioCompra: number;

  @Column('boolean')
  activo: boolean;

  @Column('integer', { name: 'id_proveedor' })
  idProveedor: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.ingredientes)
  @JoinColumn({ name: 'id_proveedor', referencedColumnName: 'id' })
  proveedor: Proveedor;

  @OneToMany(
    () => InventarioSucursal,
    (inventarioSucursal) => inventarioSucursal.ingrediente,
  )
  inventarios: InventarioSucursal[];

  @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.usuario)
  movimientos: MovimientoInventario[];

  @OneToMany(() => DetalleReceta, (detalleReceta) => detalleReceta.receta, {
    cascade: true,
  })
  detallesReceta: DetalleReceta[];
}
