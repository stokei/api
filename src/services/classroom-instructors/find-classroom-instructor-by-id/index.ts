import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindClassroomInstructorByIdQuery } from '@/queries/implements/classroom-instructors/find-classroom-instructor-by-id.query';

@Injectable()
export class FindClassroomInstructorByIdService
  implements IBaseService<string, Promise<ClassroomInstructorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomInstructorModel> {
    return await this.queryBus.execute(
      new FindClassroomInstructorByIdQuery(data)
    );
  }
}
