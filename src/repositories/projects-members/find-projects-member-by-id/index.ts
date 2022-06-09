import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ProjectsMemberMapper } from '@/mappers/projects-members';
import { ProjectsMemberModel } from '@/models/projects-member.model';

@Injectable()
export class FindProjectsMemberByIdRepository
  implements IBaseRepository<string, Promise<ProjectsMemberModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProjectsMemberModel> {
    return new ProjectsMemberMapper().toModel(
      await this.model.projectsMember.findUnique({
        where: { id }
      })
    );
  }
}
