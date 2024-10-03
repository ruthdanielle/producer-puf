import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PubSubService } from 'src/pub-sub/pub-sub.service';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';

@Module({
  imports: [PubSubModule],
  controllers: [UserController],
  providers: [UserService, PubSubService]
})
export class UserModule {}
