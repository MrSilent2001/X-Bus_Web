import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column({type: 'text', nullable:false})
    time!: string;

    @Column({nullable:false})
    busFare!: number

    @Column({nullable:false})
    seatNo!: string;
}