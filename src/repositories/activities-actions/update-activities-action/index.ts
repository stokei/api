import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateActivitiesActionDTO } from '@/dtos/activities-actions/update-activities-action.dto';

@Injectable()
export class UpdateActivitiesActionRepository
  implements IBaseRepository<UpdateActivitiesActionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateActivitiesActionDTO): Promise<boolean> {
    const updated = await this.model.activitiesAction.update({
      where: {
        id: where?.activitiesActionId
      },
      data
    });
    return !!updated;
  }
}
