import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesInstructorsDTO } from '@/dtos/courses-instructors/exists-courses-instructors.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCoursesInstructorsRepository
  implements IBaseRepository<ExistsCoursesInstructorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesInstructorsDTO): Promise<boolean> {
    return (await this.model.coursesInstructor.count({ where })) > 0;
  }
}
