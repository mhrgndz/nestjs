import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';

require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true
  });

  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}

bootstrap().then(()=> {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
}).catch((err) => console.log(err));