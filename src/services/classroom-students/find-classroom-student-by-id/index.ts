import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindClassroomStudentByIdQuery } from '@/queries/implements/classroom-students/find-classroom-student-by-id.query';

@Injectable()
export class FindClassroomStudentByIdService
  implements IBaseService<string, Promise<ClassroomStudentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomStudentModel> {
    return await this.queryBus.execute(new FindClassroomStudentByIdQuery(data));
  }
}
