import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesDTO } from '@/dtos/courses/exists-courses.dto';

@Injectable()
export class ExistsCoursesRepository
  implements IBaseRepository<ExistsCoursesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesDTO): Promise<boolean> {
    return (await this.model.course.count({ where })) > 0;
  }
}
