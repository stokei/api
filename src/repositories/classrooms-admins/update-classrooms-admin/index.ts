import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomsAdminDTO } from '@/dtos/classrooms-admins/update-classrooms-admin.dto';

@Injectable()
export class UpdateClassroomsAdminRepository
  implements IBaseRepository<UpdateClassroomsAdminDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomsAdminDTO): Promise<boolean> {
    const updated = await this.model.classroomsAdmin.update({
      where: {
        id: where?.classroomsAdminId
      },
      data
    });
    return !!updated;
  }
}
