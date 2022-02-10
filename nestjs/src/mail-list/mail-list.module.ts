import { Module } from '@nestjs/common';
import { MailList, MailListSchema } from './schemas/mail-list.schema'
import { MailListService } from './mail-list.service';
import { MailListController } from './mail-list.controller';
import { SendMailTweetsJob } from './send-mail-tweets.job';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: MailList.name, schema: MailListSchema}
    ])
  ],
  controllers: [MailListController],
  providers: [MailListService, SendMailTweetsJob]
})
export class MailListModule {}
