import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Bus} from "./bus.model";

@Entity()
export class BusSchedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    date!: Date;

    @Column({ type: 'time', nullable: false })
    scheduledTime!: string;

    @Column({nullable:false})
    seatingCapacity!:number;

    @ManyToOne(() => Bus, bus => bus.schedules)
    bus!: Bus;

}