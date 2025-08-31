import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {Bus} from "./bus.model";
import {Reservation} from "./reservation.model";

@Entity()
export class BusSchedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    date!: Date;

    @Column({ type: 'time', nullable: false })
    scheduledTime!: string;

    @Column({nullable:false })
    seatingCapacity!:number;

    @ManyToOne(() => Bus, bus => bus.schedules)
    bus!: Bus;

    @OneToMany(() => Reservation, reservation => reservation.schedule)
    reservations!: Reservation[];
}