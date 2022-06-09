import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesAdminsDTO } from '@/dtos/courses-admins/exists-courses-admins.dto';

@Injectable()
export class ExistsCoursesAdminsRepository
  implements IBaseRepository<ExistsCoursesAdminsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesAdminsDTO): Promise<boolean> {
    return (await this.model.coursesAdmin.count({ where })) > 0;
  }
}
