import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomsModuleDTO } from '@/dtos/classrooms-modules/update-classrooms-module.dto';

@Injectable()
export class UpdateClassroomsModuleRepository
  implements IBaseRepository<UpdateClassroomsModuleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomsModuleDTO): Promise<boolean> {
    const updated = await this.model.classroomsModule.update({
      where: {
        id: where?.classroomsModuleId
      },
      data
    });
    return !!updated;
  }
}
