import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCoursesAdminDTO } from '@/dtos/courses-admins/remove-courses-admin.dto';

@Injectable()
export class RemoveCoursesAdminRepository
  implements IBaseRepository<RemoveCoursesAdminDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCoursesAdminDTO): Promise<boolean> {
    const removed = await this.model.coursesAdmin.delete({
      where: {
        id: where?.coursesAdminId
      }
    });
    return !!removed;
  }
}
