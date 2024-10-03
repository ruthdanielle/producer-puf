import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { PubSubService } from './pub-sub/pub-sub.service';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [UserModule, RabbitmqModule, PubSubModule],
  controllers: [AppController],
  providers: [AppService, PubSubService],
})
export class AppModule {}
