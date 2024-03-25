import { Body, Controller, Inject, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { loginDto } from './dto/loginUser.dto';
import { UserService } from './user.service';
import { UserResponseType } from './types/userResponse.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(
    @Body() CreateUserDto: createUserDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.createUser(CreateUserDto);
    return this.userService.buildUserResponse(user);
  }
  @Post('login')
  async loginUser(@Body() LoginDto: loginDto): Promise<any> {
    const user = await this.userService.loginUser(LoginDto);
    return this.userService.buildUserResponse(user);
  }
}
