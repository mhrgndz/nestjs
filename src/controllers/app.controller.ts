import { Controller, Post } from '@nestjs/common';
import AppService from '../services/app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  index(): string {
    return this.appService.index();
  }
}