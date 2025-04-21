import {Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {User} from "./user.model";

@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column({nullable:false})
    amount!: number;

    @Column({nullable:false})
    status!: string;

    @ManyToOne(() => User, user => user.payments)
    user!: User
}