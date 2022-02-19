import { Module } from '@nestjs/common';
import { MailList, MailListSchema } from './schemas/mail-list.schema'
import { MailListService } from './mail-list.service';
import { MailListController } from './mail-list.controller';
import { SendMailTweetsJob } from './send-mail-tweets.job';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: MailList.name, schema: MailListSchema}
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE', 
        transport: Transport.KAFKA, 
        options: { 
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT),
            brokers: [process.env.KAFKA_HOST],
            ssl: process.env.KAFKA_USE_SSL === "true",
            ...(process.env.KAFKA_SASL_USERNAME &&
              process.env.KAFKA_SASL_USERNAME !== "" &&
              process.env.KAFKA_SASL_PASSWORD &&
              process.env.KAFKA_SASL_PASSWORD !== "" && {
                sasl: {
                  mechanism: "plain",
                  username: process.env.KAFKA_SASL_USERNAME,
                  password: process.env.KAFKA_SASL_PASSWORD
                },
              }),
          },
          consumer: {
            groupId: 'nest',
          }
        },
      }
    ])
  ],
  controllers: [MailListController],
  providers: [MailListService, SendMailTweetsJob, {
    provide: 'KAFKA_PRODUCER',
    useFactory: async (kafkaService: ClientKafka) => {
      return kafkaService.connect();
    },
    inject: ['KAFKA_SERVICE']
  }]
})
export class MailListModule {}
