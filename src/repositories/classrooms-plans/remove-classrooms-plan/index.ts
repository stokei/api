import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveClassroomsPlanDTO } from '@/dtos/classrooms-plans/remove-classrooms-plan.dto';

@Injectable()
export class RemoveClassroomsPlanRepository
  implements IBaseRepository<RemoveClassroomsPlanDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsPlanDTO): Promise<boolean> {
    const removed = await this.model.classroomsPlan.delete({
      where: {
        id: where?.classroomsPlanId
      }
    });
    return !!removed;
  }
}
