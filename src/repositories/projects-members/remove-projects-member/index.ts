import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveProjectsMemberDTO } from '@/dtos/projects-members/remove-projects-member.dto';

@Injectable()
export class RemoveProjectsMemberRepository
  implements IBaseRepository<RemoveProjectsMemberDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProjectsMemberDTO): Promise<boolean> {
    const removed = await this.model.projectsMember.delete({
      where: {
        id: where?.projectsMemberId
      }
    });
    return !!removed;
  }
}
