import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateAppInstructorDTO } from '@/dtos/app-instructors/create-app-instructor.dto';
import { AppInstructorMapper } from '@/mappers/app-instructors';
import { AppInstructorModel } from '@/models/app-instructor.model';

@Injectable()
export class CreateAppInstructorRepository
  implements
    IBaseRepository<CreateAppInstructorDTO, Promise<AppInstructorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAppInstructorDTO): Promise<AppInstructorModel> {
    return new AppInstructorMapper().toModel(
      await this.model.appInstructor.create({ data })
    );
  }
}
