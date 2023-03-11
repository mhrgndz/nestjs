import { Module } from '@nestjs/common';
import { EthereumController } from '../controllers/ethereum.controller';
import EthereumService from '../services/ethereum.service';

@Module({
    controllers: [EthereumController],
    providers: [EthereumService]
})
export default class EthereumModule {}