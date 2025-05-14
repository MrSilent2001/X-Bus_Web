import {Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Bus} from "./bus.model";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column({ nullable: false })
    description!: string;

    @Column({ nullable: false })
    proof!: string;

    @ManyToOne(() => Bus, bus => bus.expenses)
    bus!: Bus;
}
