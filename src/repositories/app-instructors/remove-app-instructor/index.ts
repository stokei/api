import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveAppInstructorDTO } from '@/dtos/app-instructors/remove-app-instructor.dto';

@Injectable()
export class RemoveAppInstructorRepository
  implements IBaseRepository<RemoveAppInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveAppInstructorDTO): Promise<boolean> {
    const removed = await this.model.appInstructor.deleteMany({
      where: {
        app: where?.app,
        instructor: where?.instructor
      }
    });
    return removed?.count > 0;
  }
}
