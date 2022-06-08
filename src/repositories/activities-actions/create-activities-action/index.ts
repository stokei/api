import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ActivitiesActionMapper } from '@/mappers/activities-actions';
import { CreateActivitiesActionDTO } from '@/dtos/activities-actions/create-activities-action.dto';
import { ActivitiesActionModel } from '@/models/activities-action.model';

@Injectable()
export class CreateActivitiesActionRepository
  implements
    IBaseRepository<CreateActivitiesActionDTO, Promise<ActivitiesActionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateActivitiesActionDTO
  ): Promise<ActivitiesActionModel> {
    return new ActivitiesActionMapper().toModel(
      await this.model.activitiesAction.create({ data })
    );
  }
}
