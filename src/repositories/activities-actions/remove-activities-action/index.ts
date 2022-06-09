import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveActivitiesActionDTO } from '@/dtos/activities-actions/remove-activities-action.dto';

@Injectable()
export class RemoveActivitiesActionRepository
  implements IBaseRepository<RemoveActivitiesActionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveActivitiesActionDTO): Promise<boolean> {
    const removed = await this.model.activitiesAction.delete({
      where: {
        id: where?.activitiesActionId
      }
    });
    return !!removed;
  }
}
