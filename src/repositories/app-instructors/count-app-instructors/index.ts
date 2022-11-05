import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAppInstructorsDTO } from '@/dtos/app-instructors/count-app-instructors.dto';
import { AppInstructorMapper } from '@/mappers/app-instructors';

@Injectable()
export class CountAppInstructorsRepository
  implements IBaseRepository<CountAppInstructorsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAppInstructorsDTO): Promise<number> {
    const appInstructorMapper = new AppInstructorMapper();
    return await this.model.appInstructor.count({
      where: appInstructorMapper.toWhereFindAllPrisma(where)
    });
  }
}
