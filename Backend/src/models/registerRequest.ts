import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export class RegistrationRequest {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ownerName!: string;

    @Column()
    email!: string;

    @Column()
    contactNo!: string;

    @Column()
    age!: number;

    @Column()
    gender!: string;

    @Column()
    busRegNo!: string;

    @Column()
    type!: string;

    @Column()
    manufacturedYear!: number;

    @Column()
    chassisNo!: string;

    @Column({ nullable: true })
    proof!: string;

    @Column({ default: "NOTGRANTED" })
    status!: "NOTGRANTED" | "GRANTED" | "TERMINATED";

    @ManyToOne(() => User, user => user.id, { onDelete: "CASCADE" })
    requestedBy!: User;

    @CreateDateColumn()
    createdAt!: Date;
}
