import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from 'typeorm';
import {BusSchedule} from "./schedule.model";
import { Location } from './location.model';
import {Expense} from "./expense.model";
import {Payment} from "./payment.model";

@Entity()
export class Bus {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    ownerId!: string;

    @Column({nullable:false, unique: true})
    regNo!: string;

    @Column({nullable:false})
    fleetName!: string;

    @Column()
    routeNo!: string;

    @Column({nullable:false})
    route!: string;

    @Column({nullable:false})
    seatingCapacity!:number;

    @Column({nullable:false})
    busFare!: string;

    @Column({nullable:false})
    password?: string;

    @Column()
    profilePicture?: string;

    @OneToMany(() => BusSchedule, schedule => schedule.bus)
    schedules!: BusSchedule[];

    @OneToOne(() => Location, location => location.bus)
    location!: Location;

    @OneToMany(() => Expense, expense => expense.bus)
    expenses!: Expense[];

    // 👇 New relation
    @OneToMany(() => Payment, payment => payment.bus)
    payments!: Payment[];
}
