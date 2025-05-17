import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from 'typeorm';
import {BusSchedule} from "./schedule.model";
import {User} from "./user.model";

@Entity()
@Unique(['user', 'schedule', 'date']) // ensures a user can only reserve once per schedule
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column({nullable:false})
    busFare!: number

    @Column({nullable:false})
    seatNo!: string;

    @ManyToOne(() => User, user => user.reservations, { nullable: false })
    user!: User;

    @ManyToOne(() => BusSchedule, schedule => schedule.reservations, { nullable: false })
    schedule!: BusSchedule;
}