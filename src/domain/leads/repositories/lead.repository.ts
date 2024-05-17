import { Injectable, Inject } from '@nestjs/common';
import { CreateLeadDto } from '../dtos/create-lead.dto';
import { Lead } from '../entity/lead.interface';
import { UpdateLeadDto } from '../dtos/update-lead.dto';
import { AuthService } from 'src/domain/auth/auth.service';

@Injectable()
export class LeadRepository {
  constructor(
    @Inject('LEAD_MODEL') private leadModel,
    private readonly autService: AuthService) { }

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const createdLead = new this.leadModel(createLeadDto);
    return createdLead.save();
  }

  async findAll(token): Promise<Lead[]> {

    const payload = await this.autService.decodeToken(token);
    return this.leadModel.find({
      userId: payload.id
    }).exec();
  }

  async findOne(email: string): Promise<Lead> {
    const Leads = await this.leadModel.find().exec();

    return Leads.find((Lead) => Lead.email === email);
  }

  async update(id: string, updatedLeadDto: UpdateLeadDto): Promise<Lead> {
    const updatedLead = await this.leadModel.findByIdAndUpdate(id, updatedLeadDto, { new: true }).exec();

    if (!updatedLead) {
      throw new Error('Lead not found');
    }

    return updatedLead;
  }

  async delete(id: string): Promise<void> {
    const result = await this.leadModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('Lead not found');
    }
  }
}
