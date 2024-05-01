import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Any, Repository } from "typeorm";
import { ChangePassword, CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { BarangayEmployee } from "src/barangay_employee/entities/barangay_employee.entity";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(BarangayEmployee)
    private readonly empRepo: Repository<BarangayEmployee>,
    private config: ConfigService
  ) {}

  async Create(dto: CreateUserDto) {
    let _emp = await this.findEmployee(dto.emp_id);

    if (typeof _emp === "string") return _emp;

    this.setValues(dto, _emp);

    dto.emp_id = dto.emp_id;
    dto.username = dto.username;
    dto.password = await this.hashData(dto.password);

    const newUser = this.userRepo.create(dto);
    const data = this.userRepo.save(newUser);

    return data;
  }

  async setValues(dto: CreateUserDto, emp: any) {
    dto.firstname = emp.firstname;
    dto.middlename = emp.middlename;
    dto.lastname = emp.lastname;
    dto.suffix = emp.suffix;
    dto.gender = emp.gender;
    dto.birthdate = emp.birthdate;
    dto.civil_status = emp.civil_status;
    dto.barangay = emp.barangay;
    dto.purok = emp.purok;

    dto.department = emp.department;
    dto.position = emp.position;
    dto.emp_type = emp.employee_type;
    dto.time_shift = emp.time_shift;
  }
  async findEmployee(id: string) {
    try {
      const result = await this.empRepo.findOneOrFail({ emp_id: id });

      if (result.status !== "ACTIVE") {
        return "Employee is deactivated. Contact administrator to activate.";
      }

      return result;
    } catch (error) {
      if (error.name === "EntityNotFoundError") {
        return "Employee number doesn't exist";
      } else {
        throw error;
      }
    }
  }
  async findAll() {
    const result = await this.userRepo.find({ order: { firstname: "ASC" } });
    return result;
  }

  // async Update(id: string, userDto: UpdateUserDto) {
  //   console.log({id: id, dto: userDto})
  //   delete userDto.confirmPassword;
  //   userDto.password = await this.hashData(userDto.password);
  //   await this.userRepo.update(id, { ...userDto });
  //   var data = this.findOneById(id);
  //   return data;
  // }

  async findOne(user: string, pwd: string) {
    let _user = await this.userRepo.findOne({ username: user });

    // let _user: any;

    if (_user) {
      const res = await bcrypt
        .compare(pwd, _user.password)
        .then(function (result) {
          return result;
        });
    }
    return _user;
  }

  findByEmail(email: string) {
    // return this.userRepo.findOneOrFail({ email: email });
    return email;
  }
  async findOneById(id: string) {
    return this.userRepo.findOneOrFail({ id: id });
  }

  async remove(id: string) {
    await this.userRepo.softDelete(id);
    return {
      id: id,
      message: "Successfully deleted!",
    };
  }

  async hashData(data: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data, saltOrRounds);
    return hash;
  }

  async login(uname: string, pwd: string): Promise<any> {
    let _user = await this.userRepo.findOne({ username: uname });

    if (!_user) return "This is user doesn't exist.";

    if (_user.status != "ACTIVE")
      return "The account is deactivated. Contact your administrator to activate.";

    if (!_user.isVerified) return "Your account is not yet verified.";

    if (_user) {
      const res = await bcrypt
        .compare(pwd, _user.password)
        .then(function (result) {
          return result;
        });

      if (!res) return "Password is incorrect.";

      const tokens = await this.getToken(_user);
      var encrypted = tokens.refresh_token;

      _user.rt = encrypted;
      this.userRepo.update(_user.id, _user);

      return {
        userId: _user.id,
        username: _user.username,
        firstname: _user.firstname,
        middlename: _user.middlename,
        lastname: _user.lastname,
        suffix: _user.suffix,
        barangay: _user.barangay,
        purok: _user.purok,
        department: _user.department,
        position: _user.position,
        emp_type: _user.emp_type,
        time_shift: _user.time_shift,

        isVerified: _user.isVerified,
        isFirstTime: _user.isFirstTime,
        status: _user.status,

        access_token: tokens.access_token,
        refresh_token: encrypted,
      };
    }
  }

  async getToken(_user: User) {
    const TOKEN_KEY = this.config.get("JWT_SECRET");
    const TOKEN_TIME = this.config.get("JWT_EXPIRATION_TIME");
    const REFRESH_TOKEN_KEY = this.config.get("JWT_REFRESH_SECRET");
    const REFRESH_TOKEN_TIME = this.config.get("JWT_REFRESH_EXPIRATION_TIME");

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: _user.id,
          // role: _user.roleId,
        },
        {
          expiresIn: TOKEN_TIME,
          secret: TOKEN_KEY,
        }
      ),

      this.jwtService.signAsync(
        {
          sub: _user.id,
          // role: _user.roleId,
        },
        {
          expiresIn: REFRESH_TOKEN_TIME,
          secret: REFRESH_TOKEN_KEY,
        }
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async changePassword(data: ChangePassword) {
    var model = await this.userRepo.findOne({ id: data.id });

    if (!model) return "User not found.";

    model.password = await this.hashData(data.password);
    model.isFirstTime = false;

    var retVal = await this.userRepo.save(model);

    return retVal;
  }

  async logout(rt: string) {
    const fndUser = await this.userRepo.findOne({ rt: rt });
    if (fndUser) {
      fndUser.rt = "";
      this.userRepo.save(fndUser);
    }
    return {
      message: "success",
    };
  }
  async resetPassword(email: string) {
    var model = await this.userRepo.findOne({ mobile_email: email });

    if (!model) return "Email address does not exist.";

    // model.password = model.default_pass;
    // model.first_login = true;

    var response = await this.userRepo.save(model);

    return response;
  }
}
