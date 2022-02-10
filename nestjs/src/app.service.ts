import { Injectable } from '@nestjs/common';

// Serviços contém a lógica de negócio do nosso sistema e são injetados nos controladores e módulos para serem usados

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// Para criar novos serviços -> nest generate service <name>
