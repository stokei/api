import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePlanDTO } from '@/dtos/plans/update-plan.dto';

@Injectable()
export class UpdatePlanRepository
  implements IBaseRepository<UpdatePlanDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePlanDTO): Promise<boolean> {
    const updated = await this.model.plan.update({
      where: {
        id: where?.plan
      },
      data
    });
    return !!updated;
  }
}
