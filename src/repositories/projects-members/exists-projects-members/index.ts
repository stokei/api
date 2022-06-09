import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsProjectsMembersDTO } from '@/dtos/projects-members/exists-projects-members.dto';

@Injectable()
export class ExistsProjectsMembersRepository
  implements IBaseRepository<ExistsProjectsMembersDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProjectsMembersDTO): Promise<boolean> {
    return (await this.model.projectsMember.count({ where })) > 0;
  }
}
