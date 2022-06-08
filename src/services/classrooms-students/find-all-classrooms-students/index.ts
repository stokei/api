import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';
import { FindAllClassroomsStudentsDTO } from '@/dtos/classrooms-students/find-all-classrooms-students.dto';
import { FindAllClassroomsStudentsQuery } from '@/queries/implements/classrooms-students/find-all-classrooms-students.query';

@Injectable()
export class FindAllClassroomsStudentsService
  implements
    IBaseService<
      FindAllClassroomsStudentsDTO,
      Promise<IPaginatedType<ClassroomsStudentModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsStudentsDTO
  ): Promise<IPaginatedType<ClassroomsStudentModel>> {
    return await this.queryBus.execute(
      new FindAllClassroomsStudentsQuery(data)
    );
  }
}
