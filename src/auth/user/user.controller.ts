import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ChangePassword,
  CreateUserDto,
  LoginRequestPayload,
  RefreshTokenDto,
} from "./dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller({ path: "user", version: "1" })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  Register(@Body() user: CreateUserDto) {
    return this.userService.Create(user);
  }

  @Post("login")
  Login(@Body() credential: LoginRequestPayload) {
    console.log(credential);
    return this.userService.login(credential.username, credential.password);
  }

  @Post("logout")
  logout(@Body() data: RefreshTokenDto) {
    if (data.refresh_token == "" || !data.refresh_token)
      return { message: "success" };
    return this.userService.logout(data.refresh_token);
  }
  @Post("change/password")
  async ChangePassword(@Body() data: ChangePassword) {
    return this.userService.changePassword(data);
  }
  @Post("reset/password/:email")
  ForgotPassword(@Param("email") email: string) {
    return this.userService.resetPassword(email);
  }

  @Post("setDefault/:email")
  setPasswordDefault(@Param("email") email: string) {
    return this.userService.setPasswordDefault(email);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
