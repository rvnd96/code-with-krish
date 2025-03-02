import { IsInt } from "class-validator";

export class ReduceQuantity {
    @IsInt()
    quantity: number
}