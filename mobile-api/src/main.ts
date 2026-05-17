// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app =
    await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe(),
    );
    app.setGlobalPrefix('api/v1');

    await app.listen(3000);

    console.log(
    `Server running on:
     http://localhost:3000/api/v1`
  );
}

bootstrap();