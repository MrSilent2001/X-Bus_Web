import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class LostnFound{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', nullable: true })
    userId!: number | null;

    @Column({ nullable: false })
    userName!: string;

    @Column({ nullable: false })
    contactNo!: string;

    @Column({ nullable: false })
    description!:string

    @Column({ nullable: false })
    date!: Date;

    @Column({ type: 'time', nullable: false })
    time?: string;

    @Column({ nullable: false })
    status!: string;

}