import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginRateLimitMiddleware } from 'src/middlewares/login-rate-limit.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuariosModule,
    PassportModule.register({}),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

  
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoginRateLimitMiddleware) // Aplica el middleware en el controlador completo
    .forRoutes(AuthController); // Aplica en todas las rutas del controlador de autenticación
  }
}
