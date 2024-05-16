import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entity/user.interface';

dotenv.config();

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const findUserExists = await this.userRepository.findOne(createUserDto.name);

      if (findUserExists) {
        throw new Error('User already exists');
      }

      const saltOrRounds = Number(process.env.SALT);

      const password = createUserDto.password;

      const hash = await bcrypt.hash(password, saltOrRounds);
      const createdUser = await this.userRepository.create({ ...createUserDto, password: hash });

      return createdUser;
    } catch (error) {
      this.logger.error(`Error creating User: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const foundUsers = await this.userRepository.findAll();
      return foundUsers;
    } catch (error) {
      this.logger.error(`Error finding all Users: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      const foundUser = await this.userRepository.findOne(email);
      return foundUser;
    } catch (error) {
      this.logger.error(`Error finding User: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userRepository.update(id, updateUserDto);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating User: ${error.message}`, error.stack);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedUser = await this.userRepository.delete(id);
      return;
    } catch (error) {
      this.logger.error(`Error deleting User: ${error.message}`, error.stack);
      throw error;
    }
  }
};
