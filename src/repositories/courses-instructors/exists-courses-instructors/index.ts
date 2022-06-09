import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesInstructorsDTO } from '@/dtos/courses-instructors/exists-courses-instructors.dto';

@Injectable()
export class ExistsCoursesInstructorsRepository
  implements IBaseRepository<ExistsCoursesInstructorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesInstructorsDTO): Promise<boolean> {
    return (await this.model.coursesInstructor.count({ where })) > 0;
  }
}
