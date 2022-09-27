import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { DeactivateClassroomDTO } from '@/dtos/classrooms/deactivate-classroom.dto';

@Injectable()
export class DeactivateClassroomRepository
  implements IBaseRepository<DeactivateClassroomDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: DeactivateClassroomDTO): Promise<boolean> {
    const updated = await this.model.classroom.update({
      where: {
        id: where?.classroom
      },
      data: {
        active: false
      }
    });
    return !!updated;
  }
}
