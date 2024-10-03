import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { lastValueFrom } from 'rxjs';
import { PubSubService } from 'src/pub-sub/pub-sub.service';

@Injectable()
export class UserService {

    constructor(
        private readonly pubsub: PubSubService){}

    
    async save(user: any) : Promise<any> {
        try {
            const response = await this.pubsub.send('register_created', JSON.stringify(user));
            
            console.log('Mensagem enviada para a fila:', response);
            
            return { message: 'Dados enviados com sucesso para a fila', user };

        } catch (error) {
            console.error('Erro ao enviar mensagem para a fila:', error);
            throw new Error('Falha ao enviar a mensagem para o Pub/SUb');
        }
    }

    private loadUserAttributes(input) {
        const preview : any = new Object();

        preview.id_cliente = input.users.id_cliente;
        preview.ativo = input.users.ativo;

        return preview;
    }
}
