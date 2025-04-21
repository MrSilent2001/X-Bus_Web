import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Reservation} from "./reservation.model";
import {Payment} from "./payment.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    nic!: string;

    @Column({ type: 'varchar', nullable: true })
    contactNo!: "" | string | undefined;

    @Column({unique:true})
    email!: string;

    @Column({nullable:false})
    password!: string;

    @Column({nullable:true})
    profilePicture?: string;

    @Column({nullable:false})
    role!:string;

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations!: Reservation[];

    @OneToMany(() => Payment, payment => payment.user)
    payments!: Payment[];
}