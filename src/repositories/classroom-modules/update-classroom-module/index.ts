import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomModuleDTO } from '@/dtos/classroom-modules/update-classroom-module.dto';

@Injectable()
export class UpdateClassroomModuleRepository
  implements IBaseRepository<UpdateClassroomModuleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomModuleDTO): Promise<boolean> {
    const updated = await this.model.classroomModule.update({
      where: {
        id: where?.classroomModuleId
      },
      data
    });
    return !!updated;
  }
}
