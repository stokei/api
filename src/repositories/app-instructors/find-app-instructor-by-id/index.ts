import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { AppInstructorMapper } from '@/mappers/app-instructors';
import { AppInstructorModel } from '@/models/app-instructor.model';

@Injectable()
export class FindAppInstructorByIdRepository
  implements IBaseRepository<string, Promise<AppInstructorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<AppInstructorModel> {
    return new AppInstructorMapper().toModel(
      await this.model.appInstructor.findUnique({
        where: { id }
      })
    );
  }
}
