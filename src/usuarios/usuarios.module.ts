import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Rol } from 'src/roles/entities/rol.entity';
import { Sucursal } from 'src/sucursales/entities/sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Rol,Sucursal])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
