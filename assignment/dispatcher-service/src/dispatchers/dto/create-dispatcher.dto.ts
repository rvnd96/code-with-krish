import { IsString, IsInt } from 'class-validator';


export class CreateaDipatcherDto {
    @IsString()
    dispatcherId: string;
    @IsString()
    city: string;
}