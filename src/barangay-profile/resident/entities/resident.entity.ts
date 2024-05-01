import { CommonEntity } from "src/abstract/entity.common";
import { Purok } from "src/purok/entities/purok.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Resident extends CommonEntity {
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
  fullName: string;
  @Column({ nullable: true })
  birthdate: Date;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  religion: string;
  @Column({ nullable: true })
  civilStatus: string;
  @Column({ nullable: true })
  affiliations: string;
  @Column({ nullable: true })
  barangay: string;

  @ManyToOne(() => Purok, (p) => p.res, {
    eager: true,
  })
  purok: Purok;
}
