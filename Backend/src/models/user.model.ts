import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
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
}