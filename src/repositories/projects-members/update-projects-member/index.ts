import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateProjectsMemberDTO } from '@/dtos/projects-members/update-projects-member.dto';

@Injectable()
export class UpdateProjectsMemberRepository
  implements IBaseRepository<UpdateProjectsMemberDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateProjectsMemberDTO): Promise<boolean> {
    const updated = await this.model.projectsMember.update({
      where: {
        id: where?.projectsMemberId
      },
      data
    });
    return !!updated;
  }
}
