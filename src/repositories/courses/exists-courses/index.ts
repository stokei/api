import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesDTO } from '@/dtos/courses/exists-courses.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCoursesRepository
  implements IBaseRepository<ExistsCoursesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesDTO): Promise<boolean> {
    return (await this.model.course.count({ where })) > 0;
  }
}
