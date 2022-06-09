import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsActivitiesDTO } from '@/dtos/activities/exists-activities.dto';

@Injectable()
export class ExistsActivitiesRepository
  implements IBaseRepository<ExistsActivitiesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsActivitiesDTO): Promise<boolean> {
    return (await this.model.activity.count({ where })) > 0;
  }
}
