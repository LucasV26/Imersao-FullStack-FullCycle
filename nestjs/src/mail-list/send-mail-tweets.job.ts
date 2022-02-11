import { Job } from "bull";
import { Process, Processor } from '@nestjs/bull'
import { MailListService } from "./mail-list.service";
import { Producer } from "@nestjs/microservices/external/kafka.interface";
import { ConfigService } from "@nestjs/config";
import { Inject } from "@nestjs/common";

@Processor('emails')
export class SendMailTweetsJob {

    constructor(
        @Inject('KAFKA_PRODUCER')
        private kafkaProducer: Producer,
        private mailListService: MailListService,
        private configService: ConfigService
        ) {}

    @Process()
    async handle(job: Job) {
        const mailList = await this.mailListService.findOne();
        const link = this.configService.get("NEXT_HOST");

        await this.kafkaProducer.send({
            topic: 'emails',
            messages: [{
                key: 'emails',
                value: JSON.stringify({
                    subject: 'Novos tweets encontrados',
                    body: `Acesse o <a href="${link}/tweets">link</a>`,
                    emails: mailList.emails,
                })
            }]
        })

        console.log(`Agora sim posso disparar a API de emails`);
        console.log(`Para estes emails aqui: ${mailList.emails}`);
    }
}