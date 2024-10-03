import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

@Global()
@Module({
    imports: [
      ClientsModule.register([
        {
            name: 'RABBITMQ_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
                queue: 'convenio',
                queueOptions: {
                durable: true,
                },
            },
        },
      ]),
    ],
    exports: [ClientsModule], // Exportar para outros módulos
  })

export class RabbitmqModule {}