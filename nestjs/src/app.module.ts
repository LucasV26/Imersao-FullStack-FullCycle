import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { MailListModule } from './mail-list/mail-list.module';

// Módulo principal -> Importa outros módulos e ouve a porta do servidor

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
      }
    }),
    MongooseModule.forRoot(process.env.MONGO_DSN, {
      useNewUrlParser: true
    }),
    ScheduleModule.forRoot(),
    TweetsModule,
    MailListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Para criar novos módulos -> nest generate resource <name>
