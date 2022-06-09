import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCoursesAdminDTO } from '@/dtos/courses-admins/update-courses-admin.dto';

@Injectable()
export class UpdateCoursesAdminRepository
  implements IBaseRepository<UpdateCoursesAdminDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCoursesAdminDTO): Promise<boolean> {
    const updated = await this.model.coursesAdmin.update({
      where: {
        id: where?.coursesAdminId
      },
      data
    });
    return !!updated;
  }
}
