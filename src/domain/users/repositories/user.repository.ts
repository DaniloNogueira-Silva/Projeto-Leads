import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject('USER_MODEL') private userModel) { }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(email: string) {
    const users = await this.userModel.find().exec();

    return users.find((user) => user.email === email);
  }
}
