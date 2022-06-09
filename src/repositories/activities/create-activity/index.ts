import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateActivityDTO } from '@/dtos/activities/create-activity.dto';
import { ActivityMapper } from '@/mappers/activities';
import { ActivityModel } from '@/models/activity.model';

@Injectable()
export class CreateActivityRepository
  implements IBaseRepository<CreateActivityDTO, Promise<ActivityModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateActivityDTO): Promise<ActivityModel> {
    return new ActivityMapper().toModel(
      await this.model.activity.create({ data })
    );
  }
}
