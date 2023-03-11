import { Body, Controller, Post } from '@nestjs/common';

import EthereumService from '../services/ethereum.service';
import BalanceRequestDto from '../dto/ethereum/balance.request.dto';
import BalanceResponseDto from '../dto/ethereum/balance.response.dto';

@Controller("ethereum")
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Post("balance")
  public async balance(@Body() reqDto: BalanceRequestDto): Promise<BalanceResponseDto> {
    const result = await this.ethereumService.balance(reqDto);
    return result;
  }
}