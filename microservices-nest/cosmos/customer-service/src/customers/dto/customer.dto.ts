import { IsString } from "class-validator";

export class createCustomerDto {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    address: string;
}