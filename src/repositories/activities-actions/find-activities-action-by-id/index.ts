import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ActivitiesActionMapper } from '@/mappers/activities-actions';
import { ActivitiesActionModel } from '@/models/activities-action.model';

@Injectable()
export class FindActivitiesActionByIdRepository
  implements IBaseRepository<string, Promise<ActivitiesActionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ActivitiesActionModel> {
    return new ActivitiesActionMapper().toModel(
      await this.model.activitiesAction.findUnique({
        where: { id }
      })
    );
  }
}
