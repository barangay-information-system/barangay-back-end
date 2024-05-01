import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  
  @ApiProperty()
  emp_id: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  middlename: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  suffix: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  birthdate: Date;
  @ApiProperty()
  civil_status: string;
  @ApiProperty()
  barangay: string;
  @ApiProperty()
  purok: string;

  @ApiProperty()
  department: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  emp_type: string;
  @ApiProperty()
  time_shift: string;
  
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({default: false})
  isVerified: boolean;
  @ApiProperty()
  mobile_email: string;

  
}

export class LoginRequestPayload {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({default: false})
  rememberMe: boolean;
}
export class RefreshTokenDto {
  refresh_token: string
}

export class ChangePassword {
  @ApiProperty()
  id: string
  @ApiProperty()
  password: string
}