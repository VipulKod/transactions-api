import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Transactions API')
    .setDescription(
      'Simple transaction platform for placing buying and selling orders on the platform',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Transactions API')
    .build();

  app.useGlobalFilters(new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
