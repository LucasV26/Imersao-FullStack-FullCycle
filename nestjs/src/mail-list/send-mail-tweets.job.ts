import { Job } from "bull";
import { Process, Processor } from '@nestjs/bull'
import { MailListService } from "./mail-list.service";

@Processor('emails')
export class SendMailTweetsJob {

    constructor(private mailListService: MailListService) {}

    @Process()
    async handle(job: Job) {
        const mailList = await this.mailListService.findOne();
        
        console.log(`Agora sim posso disparar a API de emails`);
        console.log(`Com esses emails aqui: ${mailList.emails}`);
    }
}