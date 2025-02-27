import { IsInt, IsString } from "class-validator";

export class createProductDto {
    @IsString()
    name: string;
    @IsInt()
    price: number;
    @IsInt()
    quantity: number;
}