import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCourseDTO } from '@/dtos/courses/update-course.dto';

@Injectable()
export class UpdateCourseRepository
  implements IBaseRepository<UpdateCourseDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCourseDTO): Promise<boolean> {
    const updated = await this.model.course.update({
      where: {
        id: where?.courseId
      },
      data
    });
    return !!updated;
  }
}
