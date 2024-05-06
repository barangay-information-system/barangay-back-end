import { CommonEntity } from "src/abstract/entity.common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mobile_email: string;

    @Column()
    code: string;

    @Column()
    expired_at: Date;
}
