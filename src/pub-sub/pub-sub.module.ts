import { Module } from '@nestjs/common';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';
import { PubSubService } from './pub-sub.service';

@Module({
  providers: [
    {
        provide: GCPubSubClient,
        useFactory: () => {
          return new GCPubSubClient({
            client: {
              projectId: process.env.PUBSUB_PROJECT_ID || "devplayground-250020",
              keyFilename: process.env.GOOGLE_CREDENTIALS,
            }
          });
        },
    },
    PubSubService
  ],
  exports: [PubSubService, GCPubSubClient],
})
export class PubSubModule {}
