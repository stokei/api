import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ActivateClassroomDTO } from '@/dtos/classrooms/activate-classroom.dto';

@Injectable()
export class ActivateClassroomRepository
  implements IBaseRepository<ActivateClassroomDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ActivateClassroomDTO): Promise<boolean> {
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
