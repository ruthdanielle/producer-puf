import { Injectable } from '@nestjs/common';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';
import { v4 as uuid } from 'uuid';
import { UserDto } from 'src/user/user.dto';
import * as dotenv from 'dotenv';
import { firstValueFrom, lastValueFrom } from 'rxjs';

dotenv.config();

@Injectable()
export class PubSubService {
    resposta: any
    constructor(private readonly client: GCPubSubClient) {}

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
