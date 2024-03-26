import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { loginDto } from './dto/loginUser.dto';
import { UserService } from './user.service';
import { UserResponseType } from './types/userResponse.types';
import { ExpressRequests } from './middleware/auth.middleware';
import { Request } from '@nestjs/common';

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
  async loginUser(@Body() LoginDto: loginDto): Promise<UserResponseType> {
    const user = await this.userService.loginUser(LoginDto);
    return this.userService.buildUserResponse(user);
  }
  @Get()
  async currentUser(
    @Request() request: ExpressRequests,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.buildUserResponse(request.user);
  }
}
