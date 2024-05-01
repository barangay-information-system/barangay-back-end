import { Resident } from "src/barangay-profile/resident/entities/resident.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "setup_purok" })
export class Purok {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  purok: string;
  @Column({ type: "int", nullable: true })
  brgy_id: number;
  @Column({ nullable: true })
  barangay: string;
  @Column({ nullable: true })
  cityMun: string;
  @Column({ nullable: true })
  longitude: string;
  @Column({ nullable: true })
  latitude: string;
  @Column({ default: "ACTIVE" })
  status: string;

  @OneToMany(() => Resident, (r) => r.id)
  res: Resident;

}
