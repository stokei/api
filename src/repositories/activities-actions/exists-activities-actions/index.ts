import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsActivitiesActionsDTO } from '@/dtos/activities-actions/exists-activities-actions.dto';

@Injectable()
export class ExistsActivitiesActionsRepository
  implements IBaseRepository<ExistsActivitiesActionsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsActivitiesActionsDTO): Promise<boolean> {
    return (await this.model.activitiesAction.count({ where })) > 0;
  }
}
