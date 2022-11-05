import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAppInstructorsDTO } from '@/dtos/app-instructors/find-all-app-instructors.dto';
import { AppInstructorMapper } from '@/mappers/app-instructors';
import { AppInstructorModel } from '@/models/app-instructor.model';

@Injectable()
export class FindAllAppInstructorsRepository
  implements
    IBaseRepository<FindAllAppInstructorsDTO, Promise<AppInstructorModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAppInstructorsDTO): Promise<AppInstructorModel[]> {
    const appInstructorMapper = new AppInstructorMapper();
    return appInstructorMapper.toModels(
      await this.model.appInstructor.findMany(
        appInstructorMapper.toFindAllPrisma(data)
      )
    );
  }
}
