import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entity/user.interface';
import mongoose from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@Inject('USER_MODEL') private userModel) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    const users = await this.userModel.find().exec();

    return users.find((user) => user.email === email);
  }

  async update(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updatedUserDto, { new: true }).exec();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('User not found');
    }
  }

  async findById(id: string): Promise<User> {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedUser = await this.userModel.findOne({ _id: objectId }).exec();
    return foundedUser;
  }  
}
