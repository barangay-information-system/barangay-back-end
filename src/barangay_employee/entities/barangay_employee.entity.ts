import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BarangayEmployee {
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    emp_id: string;
    @Column({ nullable: true })
    prefix: string;
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
    birthplace: string;
    @Column({ nullable: true })
    civil_status: string;
    @Column({ nullable: true })
    religion: string;
    
    @Column({ type: 'int', nullable: true })
    brgy_id: number;
    @Column({ nullable: true })
    barangay: string;
    
    @Column({ type: 'int', nullable: true })
    dept_id: number;
    @Column({ nullable: true })
    department: string;
    
    @Column({ type: 'int', nullable: true })
    pos_id: number;
    @Column({ nullable: true })
    position: string;
    
    @Column({ type: 'int', nullable: true })
    type_id: number;
    @Column({ nullable: true })
    employee_type: string;
    
    @Column({ type: 'int', nullable: true })
    shift_id: number;
    @Column({ nullable: true })
    time_shift: string;

    @Column({ default: 'ACTIVE' })
    status: string;
}
