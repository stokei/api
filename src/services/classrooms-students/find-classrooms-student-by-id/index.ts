import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomsStudentModel } from '@/models/classrooms-student.model';
import { FindClassroomsStudentByIdQuery } from '@/queries/implements/classrooms-students/find-classrooms-student-by-id.query';

@Injectable()
export class FindClassroomsStudentByIdService
  implements IBaseService<string, Promise<ClassroomsStudentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsStudentModel> {
    return await this.queryBus.execute(
      new FindClassroomsStudentByIdQuery(data)
    );
  }
}
