import { Body, Controller, OnApplicationShutdown, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';
import { PubSubService } from 'src/pub-sub/pub-sub.service';

@Controller('user')
export class UserController {

    constructor(private readonly pubsub: PubSubService) {
    }

    @Post()
    async save(@Body() user: UserDto) {

        try {
            const resposta = await this.pubsub.send("cadastro.upsert", JSON.stringify(user));
            console.log('Mensagem enviada com sucesso');
            return { success: true };

        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
            throw new Error('Erro ao publicar mensagem no Pub/Sub');
        }
    }
}
