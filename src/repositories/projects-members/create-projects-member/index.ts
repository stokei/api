import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateProjectsMemberDTO } from '@/dtos/projects-members/create-projects-member.dto';
import { ProjectsMemberMapper } from '@/mappers/projects-members';
import { ProjectsMemberModel } from '@/models/projects-member.model';

@Injectable()
export class CreateProjectsMemberRepository
  implements
    IBaseRepository<CreateProjectsMemberDTO, Promise<ProjectsMemberModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProjectsMemberDTO): Promise<ProjectsMemberModel> {
    return new ProjectsMemberMapper().toModel(
      await this.model.projectsMember.create({ data })
    );
  }
}
