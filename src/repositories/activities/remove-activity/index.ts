import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveActivityDTO } from '@/dtos/activities/remove-activity.dto';

@Injectable()
export class RemoveActivityRepository
  implements IBaseRepository<RemoveActivityDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveActivityDTO): Promise<boolean> {
    const removed = await this.model.activity.delete({
      where: {
        id: where?.activityId
      }
    });
    return !!removed;
  }
}
