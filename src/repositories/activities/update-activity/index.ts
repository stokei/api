import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
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
