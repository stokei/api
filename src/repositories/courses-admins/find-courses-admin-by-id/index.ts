import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CoursesAdminMapper } from '@/mappers/courses-admins';
import { CoursesAdminModel } from '@/models/courses-admin.model';

@Injectable()
export class FindCoursesAdminByIdRepository
  implements IBaseRepository<string, Promise<CoursesAdminModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CoursesAdminModel> {
    return new CoursesAdminMapper().toModel(
      await this.model.coursesAdmin.findUnique({
        where: { id }
      })
    );
  }
}
