import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsProjectsMembersDTO } from '@/dtos/projects-members/exists-projects-members.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsProjectsMembersRepository
  implements IBaseRepository<ExistsProjectsMembersDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProjectsMembersDTO): Promise<boolean> {
    return (await this.model.projectsMember.count({ where })) > 0;
  }
}
