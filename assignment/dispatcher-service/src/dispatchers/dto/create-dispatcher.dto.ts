import { IsString, IsInt } from 'class-validator';


export class CreateaDipatcherDto {
    @IsInt()
    dispatcherId: number;
    @IsString()
    city: string;
}