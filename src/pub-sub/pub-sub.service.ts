import { Injectable } from '@nestjs/common';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

dotenv.config();

@Injectable()
export class PubSubService {
    client : ClientProxy

    constructor() {
        this.client = new GCPubSubClient({
          client: {
              projectId: process.env.PUBSUB_PROJECT_ID || "devplayground-250020",
              keyFilename: process.env.GOOGLE_CREDENTIALS,
            },
        topic: process.env.PUBSUB_CADASTRO_TOPIC,
        init: false,
        checkExistence: true
        });
      }

    async send(type: any, payload: string) : Promise<void> {
        const message = {
            id: uuid(),
            type,
            payload
        };
    
        console.log('Mensagem a ser enviada:', message);

        const topic = process.env.PUBSUB_CADASTRO_TOPIC || 'not_set';
        
        return await firstValueFrom(
            this.client.emit(topic, message)
        );
    }
}
