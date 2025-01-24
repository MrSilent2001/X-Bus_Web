import {Entity, PrimaryColumn, Column} from 'typeorm';
@Entity()
export class UserVerification {
    @PrimaryColumn()
    id!: number;

    @Column({nullable: false})
    email!: string;

    @Column({nullable:false})
    verificationCode!: string;

    @Column({nullable:false})
    expiryDate!: Date;
}