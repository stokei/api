import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { CoursesAdminMapper } from '@/mappers/courses-admins';
import { CreateCoursesAdminDTO } from '@/dtos/courses-admins/create-courses-admin.dto';
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
