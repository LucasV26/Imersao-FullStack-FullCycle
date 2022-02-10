import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Toda a aplicação, ao fim, se resume ao módulo principal, que ouve a porta indicada

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
