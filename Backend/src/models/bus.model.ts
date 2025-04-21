
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {BusSchedule} from "./schedule.model";

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

}
