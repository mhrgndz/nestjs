import { Injectable } from "@nestjs/common";
import BaseService from "./base.service";

import BalanceRequestDto from "../dto/ethereum/balance.request.dto";
import BalanceResponseDto from "../dto/ethereum/balance.response.dto";

@Injectable()
export default class EthereumService extends BaseService {
    public async balance(reqDto: BalanceRequestDto): Promise<BalanceResponseDto> {
        const { addressList, id, currencies } = reqDto;
        const { correctAddresses, wrongAddresses } = await this.isEthereumAddress(addressList);
        const simplePrice = await this.getSimplePrice(id, currencies);

        if (!simplePrice) {
            console.log("PRICE_NOT_FOUND");
            return;
        }

        const ethereumWallets = await this.findMatchingAddressesFromJson(correctAddresses);

        if (!ethereumWallets) {
            console.log("ADDRESS_NOT_FOUND");
            return;
        }

        const calculation = await this.portfolioCalculation (ethereumWallets, simplePrice.ethereum.usd);
        const sortedAddresses = calculation.sort((a, b) => b.usd_balance - a.usd_balance);

        return { wrongAddresses, sortedAddresses };
    }

    private async portfolioCalculation(walletList, exchangeRate) {
        const data = walletList.map(wallet => ({
            address: wallet.address,
            eth_balance: wallet.amount,
            usd_balance: wallet.amount * exchangeRate ,
        }));
        
        return data;
    }
} 