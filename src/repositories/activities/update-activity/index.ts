import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateActivityDTO } from '@/dtos/activities/update-activity.dto';

@Injectable()
export class UpdateActivityRepository
  implements IBaseRepository<UpdateActivityDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateActivityDTO): Promise<boolean> {
    const updated = await this.model.activity.update({
      where: {
        id: where?.activityId
      },
      data
    });
    return !!updated;
  }
}
