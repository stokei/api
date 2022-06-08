import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesAdminsDTO } from '@/dtos/courses-admins/exists-courses-admins.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCoursesAdminsRepository
  implements IBaseRepository<ExistsCoursesAdminsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesAdminsDTO): Promise<boolean> {
    return (await this.model.coursesAdmin.count({ where })) > 0;
  }
}
