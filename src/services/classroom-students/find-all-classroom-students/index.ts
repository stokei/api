import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllClassroomStudentsDTO } from '@/dtos/classroom-students/find-all-classroom-students.dto';
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindAllClassroomStudentsQuery } from '@/queries/implements/classroom-students/find-all-classroom-students.query';

@Injectable()
export class FindAllClassroomStudentsService
  implements
    IBaseService<
      FindAllClassroomStudentsDTO,
      Promise<IPaginatedType<ClassroomStudentModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomStudentsDTO
  ): Promise<IPaginatedType<ClassroomStudentModel>> {
    return await this.queryBus.execute(new FindAllClassroomStudentsQuery(data));
  }
}
