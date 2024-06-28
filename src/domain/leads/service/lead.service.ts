import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LeadRepository } from '../repositories/lead.repository';
import { CreateLeadDto } from '../dtos/create-lead.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UpdateLeadDto } from '../dtos/update-lead.dto';
import { Lead } from '../entity/lead.interface';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { Request } from 'express';
import { AuthService } from 'src/domain/auth/auth.service';

dotenv.config();

@Injectable()
export class LeadService {
  private readonly logger = new Logger(LeadService.name);

  constructor(
    private readonly LeadRepository: LeadRepository,
    private readonly userRepository: UserRepository,
    private readonly autService: AuthService,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    try {
      const foundUser = await this.userRepository.findById(
        createLeadDto.userId,
      );

      if (!foundUser) {
        throw new NotFoundException('Url não condizente');
      }
      const createdLead = await this.LeadRepository.create(createLeadDto);
      return createdLead;
    } catch (error) {
      this.logger.error(`Error creating Lead: ${error.message}`, error.stack);
      throw new UnprocessableEntityException(
        'Erro ao cadastrar o lead',
        error.message,
      );
    }
  }

  async findAll(token: string): Promise<Lead[]> {
    try {
      const foundLeads = await this.LeadRepository.findAll(token);

      return foundLeads;
    } catch (error) {
      this.logger.error(
        `Error finding all Leads: ${error.message}`,
        error.stack,
      );
      throw new NotFoundException('Erro ao buscar os leads', error.message);
    }
  }

  async findOne(email: string): Promise<Lead> {
    try {
      const foundLead = await this.LeadRepository.findOne(email);
      return foundLead;
    } catch (error) {
      this.logger.error(`Error finding Lead: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o lead', error.message);
    }
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    try {
      const updatedLead = await this.LeadRepository.update(id, updateLeadDto);
      return updatedLead;
    } catch (error) {
      this.logger.error(`Error updating Lead: ${error.message}`, error.stack);
      throw new UnprocessableEntityException(
        'Erro ao atualizar o lead',
        error.message,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.LeadRepository.delete(id);
      return;
    } catch (error) {
      this.logger.error(`Error deleting Lead: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao deletar o lead', error.message);
    }
  }
}
