import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { userEntity } from './user.entity';
import { Model } from 'mongoose';
import { loginDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';
import { UserResponseType } from './types/userResponse.types';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(userEntity.name) private userModel: Model<userEntity>,
  ) {}

  async createUser(CreateUserDto: createUserDto): Promise<userEntity> {
    const user = await this.userModel.findOne({ email: CreateUserDto.email });
    if (user) {
      throw new HttpException(
        'email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new this.userModel(CreateUserDto);
    return newUser.save();
  }

  async loginUser(loginDto: loginDto): Promise<userEntity> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');
    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isCorrectPassword = await compare(loginDto.password, user.password);
    if (!isCorrectPassword) {
      throw new HttpException(
        'Incorrect password. Please enter correct password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }
  buildUserResponse(UserEntity: userEntity): UserResponseType {
    return {
      name: UserEntity.name,
      email: UserEntity.email,
      token: this.generateJwt(UserEntity),
    };
  }
  generateJwt(UserEntity: userEntity): string {
    return sign({ email: UserEntity.email }, 'JWT');
  }
  async findByEmail(email: string): Promise<userEntity> {
    return this.userModel.findOne({ email });
  }
}
