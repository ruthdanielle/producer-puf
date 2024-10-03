import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  // Instância HTTP
  const app = await NestFactory.create(AppModule);

  // Configura um microservice Google Pub/Sub
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    strategy: new GCPubSubServer({
      topic: process.env.PUBSUB_CADASTRO_TOPIC || "dev-cadastro-mock-topic",
      client: {
        projectId: process.env.PUBSUB_PROJECT_ID || "devplayground-250020",
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || "./keys/devplayground-250020-88bf62d91f50.json",
      },
      subscription: "dev-cadastro-mock-sub",
      init: false,
      checkExistence: true
    }),
  });

  // Inicia o microservice
  // await app.startAllMicroservices();

  // Inicia o servidor HTTP na porta 3001
  await app.listen(3001);

  // Configura o microservice RabbitMQ
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'], 
  //     queue: 'convenio',               
  //     queueOptions: {
  //       durable: false,                
  //     },
  //   },
  // });

}
bootstrap();
