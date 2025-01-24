import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Inventario NOVA 2025')
    .setDescription('API Rest Sistema de Inventario NOVA 2025')
    .setVersion('1.0')
    // .addTag('Categorias, Ingredientes, Clientes, Proveedores, Sucursales, Inventarios-Sucursales, Roles, Usuarios, Auth') // Agregar etiquetas
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  await app.listen(process.env.PORT);
  console.log(`Servidor esta corriendo en ${await app.getUrl()}/apidoc`);
}
bootstrap();
