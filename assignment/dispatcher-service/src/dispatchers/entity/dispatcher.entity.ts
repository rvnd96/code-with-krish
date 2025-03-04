import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dispatcher {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    dispatcherId: string;
    @Column()
    city: string;
}