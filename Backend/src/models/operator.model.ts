import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Bus} from "./bus.model";

@Entity()
export class Operator {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    nic!: string;

    @Column({ type: 'varchar', nullable: true })
    contactNo!: string | null;

    @Column({unique:true})
    email!: string;

    @Column({nullable:false})
    yearsOfExperience!: number;

    @ManyToOne(() => Bus, bus => bus.operators)
    @JoinColumn({ name: "busRegNo", referencedColumnName: "regNo" })
    bus!: Bus;

    @Column()
    busRegNo!: string;
}
