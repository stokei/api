import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCourseDTO } from '@/dtos/courses/remove-course.dto';

@Injectable()
export class RemoveCourseRepository
  implements IBaseRepository<RemoveCourseDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCourseDTO): Promise<boolean> {
    const removed = await this.model.course.delete({
      where: {
        id: where?.courseId
      }
    });
    return !!removed;
  }
}
