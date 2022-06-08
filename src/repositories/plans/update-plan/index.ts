import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdatePlanDTO } from '@/dtos/plans/update-plan.dto';

@Injectable()
export class UpdatePlanRepository
  implements IBaseRepository<UpdatePlanDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePlanDTO): Promise<boolean> {
    const updated = await this.model.plan.update({
      where: {
        id: where?.planId
      },
      data
    });
    return !!updated;
  }
}
