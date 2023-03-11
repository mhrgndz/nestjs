import { IsArray, IsString } from "class-validator";

export default class BalanceRequestDto {
    @IsString()
    id: string;

    @IsString()
    currencies: string;

    @IsArray()
    addressList: string[];
}