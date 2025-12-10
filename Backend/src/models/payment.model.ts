import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from 'typeorm';
import {User} from "./user.model";
import {BusSchedule} from "./schedule.model";
import {Bus} from "./bus.model";

@Unique(['user', 'schedule', 'date']) // ensures only one per user-schedule-date
@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column({ nullable: false })
    amount!: number;

    @Column({ nullable: false })
    status!: string;

    @ManyToOne(() => User, user => user.payments)
    user!: User;

    @ManyToOne(() => BusSchedule)
    schedule!: BusSchedule;

    @ManyToOne(() => Bus)
    bus!: Bus;
}
