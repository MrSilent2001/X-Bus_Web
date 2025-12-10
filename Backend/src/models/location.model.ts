import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import {Bus} from "./bus.model";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    coordinates!: string;

    @Column()
    date!: Date;

    @Column({type: 'time', nullable:false})
    time!: string

    @OneToOne(() => Bus, bus => bus.location)
    @JoinColumn()
    bus!: Bus;
}