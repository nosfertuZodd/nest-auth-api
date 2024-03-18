import { Body, Controller, Inject, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { loginDto } from './dto/loginUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() CreateUserDto: createUserDto): Promise<any> {
    const user = await this.userService.createUser(CreateUserDto);
    return user;
  }
  @Post()
  async loginUser(@Body() LoginDto: loginDto): Promise<any> {
    const user = await this.userService.loginUser(LoginDto);
    return user;
  }
}
