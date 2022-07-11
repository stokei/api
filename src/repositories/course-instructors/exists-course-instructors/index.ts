import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCourseInstructorsDTO } from '@/dtos/course-instructors/exists-course-instructors.dto';

@Injectable()
export class ExistsCourseInstructorsRepository
  implements IBaseRepository<ExistsCourseInstructorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCourseInstructorsDTO): Promise<boolean> {
    return (await this.model.courseInstructor.count({ where })) > 0;
  }
}
