import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ActivityMapper } from '@/mappers/activities';
import { ActivityModel } from '@/models/activity.model';

@Injectable()
export class FindActivityByIdRepository
  implements IBaseRepository<string, Promise<ActivityModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ActivityModel> {
    return new ActivityMapper().toModel(
      await this.model.activity.findUnique({
        where: { id }
      })
    );
  }
}
