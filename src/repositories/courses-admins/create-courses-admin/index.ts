import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCoursesAdminDTO } from '@/dtos/courses-admins/create-courses-admin.dto';
import { CoursesAdminMapper } from '@/mappers/courses-admins';
import { CoursesAdminModel } from '@/models/courses-admin.model';

@Injectable()
export class CreateCoursesAdminRepository
  implements IBaseRepository<CreateCoursesAdminDTO, Promise<CoursesAdminModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCoursesAdminDTO): Promise<CoursesAdminModel> {
    return new CoursesAdminMapper().toModel(
      await this.model.coursesAdmin.create({ data })
    );
  }
}
