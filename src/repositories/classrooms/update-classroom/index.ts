import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomDTO } from '@/dtos/classrooms/update-classroom.dto';

@Injectable()
export class UpdateClassroomRepository
  implements IBaseRepository<UpdateClassroomDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomDTO): Promise<boolean> {
    const updated = await this.model.classroom.update({
      where: {
        id: where?.classroomId
      },
      data
    });
    return !!updated;
  }
}
