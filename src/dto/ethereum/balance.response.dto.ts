import { IsArray } from "class-validator";

export default class BalanceResponseDto {
    @IsArray()
    wrongAddresses: string[];

    @IsArray()
    sortedAddresses: string[];
}