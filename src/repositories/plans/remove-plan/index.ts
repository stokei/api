import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemovePlanDTO } from '@/dtos/plans/remove-plan.dto';

@Injectable()
export class RemovePlanRepository
  implements IBaseRepository<RemovePlanDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePlanDTO): Promise<boolean> {
    const removed = await this.model.plan.delete({
      where: {
        id: where?.planId
      }
    });
    return !!removed;
  }
}
