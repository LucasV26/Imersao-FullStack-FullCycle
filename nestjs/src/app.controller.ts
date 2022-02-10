import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controllers mapeiam nossos recursos às rotas desejadas
// As rotas são configuradas nos marcadores @Controller e @<VerboHTTP>

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// Para criar novos controladores -> nest generate controller <name>
