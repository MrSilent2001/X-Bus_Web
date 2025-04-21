import {Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Refund{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column({nullable:false})
    paymentId!: number;

    @Column({nullable:false})
    accountDetails!: string;

    @Column({nullable:false})
    status!: string;

}