import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveProjectsPlanDTO } from '@/dtos/projects-plans/remove-projects-plan.dto';

@Injectable()
export class RemoveProjectsPlanRepository
  implements IBaseRepository<RemoveProjectsPlanDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProjectsPlanDTO): Promise<boolean> {
    const removed = await this.model.projectsPlan.delete({
      where: {
        id: where?.projectsPlanId
      }
    });
    return !!removed;
  }
}
