import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { LeadService } from './service/lead.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateLeadDto } from './dtos/update-lead.dto';

@UseGuards(AuthGuard)
@Controller('lead')
export class LeadController {
  constructor(private readonly LeadService: LeadService) { }

  @Post()
  async create(
    @Body() createLeadDto: CreateLeadDto,
    @Req() req
  ) {
    return this.LeadService.create(createLeadDto, req);
  }

  @Get()
  async getAll(@Req() req) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    return this.LeadService.findAll(token);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.LeadService.update(id, updateLeadDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.LeadService.delete(id);
  }
}
