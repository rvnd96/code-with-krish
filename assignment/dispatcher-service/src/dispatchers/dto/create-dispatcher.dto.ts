import { IsString, IsInt } from 'class-validator';


export class CreateaDipatcherDto {
    @IsInt()
    dispatcherId: string;
    @IsString()
    city: string;
}