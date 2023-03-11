import { Module } from '@nestjs/common';

import AppService from './services/app.service';
import AppController from './controllers/app.controller';
import EthereumModule from './modules/ethereum.module';

@Module({
  imports: [EthereumModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
