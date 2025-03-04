import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dispatcher {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    dispatcherId: number;
    @Column()
    city: string;
}