import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveClassroomModuleDTO } from '@/dtos/classroom-modules/remove-classroom-module.dto';

@Injectable()
export class RemoveClassroomModuleRepository
  implements IBaseRepository<RemoveClassroomModuleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomModuleDTO): Promise<boolean> {
    const removed = await this.model.classroomModule.deleteMany({
      where: {
        app: where?.app,
        classroom: where?.classroom,
        module: where?.module
      }
    });
    return removed?.count > 0;
  }
}
