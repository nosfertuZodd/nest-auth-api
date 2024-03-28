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
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: '',
    type: '',
  })
  async createUser(
    @Body() CreateUserDto: createUserDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.createUser(CreateUserDto);
    return this.userService.buildUserResponse(user);
  }
  @Post('login')
  @ApiCreatedResponse({
    description: '',
    type: '',
  })
  async loginUser(@Body() LoginDto: loginDto): Promise<UserResponseType> {
    const user = await this.userService.loginUser(LoginDto);
    return this.userService.buildUserResponse(user);
  }
  @Get()
  @ApiCreatedResponse({
    description: '',
    type: '',
  })
  async currentUser(
    @Request() request: ExpressRequests,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.buildUserResponse(request.user);
  }
}
