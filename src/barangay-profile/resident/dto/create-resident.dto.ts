import { Purok } from "src/purok/entities/purok.entity";

export class CreateResidentDto {
  prefix: string;
  firstname: string;
  middlename: string;
  lastname: string;
  suffix: string;
  birthdate: Date;
  gender: string;
  religion: string;
  civilStatus: string;
  affiliations: string;
  barangay: string;
  setup: Purok;
  fullName: string;
}
