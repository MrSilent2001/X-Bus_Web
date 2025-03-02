import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
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

}