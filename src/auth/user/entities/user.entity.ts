import { CommonEntity } from "src/abstract/entity.common";
import {
  Column,
  Entity,
} from "typeorm";

@Entity()
export class User extends CommonEntity {

  @Column({ nullable: true })
  emp_id: string;
  @Column({ nullable: true })
  firstname: string;
  @Column({ nullable: true })
  middlename: string;
  @Column({ nullable: true })
  lastname: string;
  @Column({ nullable: true })
  suffix: string;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  birthdate: Date;
  @Column({ nullable: true })
  civil_status: string;
  @Column({ nullable: true })
  barangay: string;
  @Column({ nullable: true })
  purok: string;
  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  department: string;
  @Column({ nullable: true })
  position: string;
  @Column({ nullable: true })
  emp_type: string;
  @Column({ nullable: true })
  time_shift: string;
  
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true, default: false })
  isVerified: boolean;
  @Column({ nullable: true, default: true })
  isFirstTime: boolean;
  @Column({ nullable: true })
  mobile_email: string;
  

  @Column({ type: 'text', nullable: true, select: false })
  rt: string

  @Column({ default: 'ACTIVE' })
  status: string;
}
