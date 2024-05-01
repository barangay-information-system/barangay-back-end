import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AuditTrail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    transId: string;
    @Column({ nullable: true })
    userId: string;
    @Column({ nullable: true }) 
    userName: string;
    @Column({ nullable: true }) 
    transType: string;
    @Column({ nullable: true }) 
    reference: string;
    @Column({ nullable: true }) 
    actions: string;
    @Column({ nullable: true }) 
    IP: string;
    @Column({ nullable: true }) 
    PC: string;
    @Column({ default: 'Active' }) 
    status: string;
    
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn({ select: false })
    updated_at: Date;
    @DeleteDateColumn({ select: false })
    deleted_at: Date;
}
