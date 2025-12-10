import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ownerName!: string;

    @Column()
    email!: string;

    @Column()
    busRegNo!: string;

    @Column({ default: "NOTGRANTED" })
    status!: "NOTGRANTED" | "GRANTED" | "TERMINATED";

    @CreateDateColumn()
    createdAt!: Date;
}
