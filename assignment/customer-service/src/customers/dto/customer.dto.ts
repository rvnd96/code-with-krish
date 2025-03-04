import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createCustomerDto {
    @IsString()
    @Transform(({ value }) => value.trim())
    name: string;

    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({message: 'Email address is required'})
    email: string;

    @IsString()
    @IsOptional()
    address: string;
}