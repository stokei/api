import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';
import { FindClassroomsInstructorByIdQuery } from '@/queries/implements/classrooms-instructors/find-classrooms-instructor-by-id.query';

@Injectable()
export class FindClassroomsInstructorByIdService
  implements IBaseService<string, Promise<ClassroomsInstructorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsInstructorModel> {
    return await this.queryBus.execute(
      new FindClassroomsInstructorByIdQuery(data)
    );
  }
}
