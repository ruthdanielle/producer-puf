import { Body, Controller, OnApplicationShutdown, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';

@Controller('user')
export class UserController {

    client : ClientProxy

    constructor(private readonly userService: UserService) {
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

    
    @Post()
    async save(@Body() user: UserDto) {

        try {
            // Usa emit() para publicar a mensagem no Pub/Sub
            await this.client.emit(process.env.PUBSUB_CADASTRO_TOPIC, JSON.stringify(user));
            console.log('Mensagem enviada com sucesso');
            return { success: true };

        } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
        throw new Error('Erro ao publicar mensagem no Pub/Sub');
        }
    }

    // @MessagePattern(process.env.PUBSUB_CADASTRO_TOPIC || 'dev-cadastro-mock-topic')
    //     async handleUserMessage(data: UserDto) {
    //       console.log('Mensagem recebida:', data);
    //       // Lógica para processar a mensagem
    //     }

    
}
