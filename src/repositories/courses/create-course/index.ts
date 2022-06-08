import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { CourseMapper } from '@/mappers/courses';
import { CreateCourseDTO } from '@/dtos/courses/create-course.dto';
import { CourseModel } from '@/models/course.model';

@Injectable()
export class CreateCourseRepository
  implements IBaseRepository<CreateCourseDTO, Promise<CourseModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCourseDTO): Promise<CourseModel> {
    return new CourseMapper().toModel(await this.model.course.create({ data }));
  }
}
