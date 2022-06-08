import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateProjectsPlanDTO } from '@/dtos/projects-plans/update-projects-plan.dto';

@Injectable()
export class UpdateProjectsPlanRepository
  implements IBaseRepository<UpdateProjectsPlanDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateProjectsPlanDTO): Promise<boolean> {
    const updated = await this.model.projectsPlan.update({
      where: {
        id: where?.projectsPlanId
      },
      data
    });
    return !!updated;
  }
}
