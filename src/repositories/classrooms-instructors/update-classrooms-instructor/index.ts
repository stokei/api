import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/update-classrooms-instructor.dto';

@Injectable()
export class UpdateClassroomsInstructorRepository
  implements IBaseRepository<UpdateClassroomsInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: UpdateClassroomsInstructorDTO): Promise<boolean> {
    const updated = await this.model.classroomsInstructor.update({
      where: {
        id: where?.classroomsInstructorId
      },
      data
    });
    return !!updated;
  }
}
