import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    passengerName!: string;

    @Column({nullable:false})
    busRegNo!: string;

    @Column({nullable:false})
    message!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    date!: Date;

    @Column({ type: 'time', nullable: false })
    time?: string;
}