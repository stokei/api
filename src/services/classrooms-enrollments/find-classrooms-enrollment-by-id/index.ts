import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';
import { FindClassroomsEnrollmentByIdQuery } from '@/queries/implements/classrooms-enrollments/find-classrooms-enrollment-by-id.query';

@Injectable()
export class FindClassroomsEnrollmentByIdService
  implements IBaseService<string, Promise<ClassroomsEnrollmentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsEnrollmentModel> {
    return await this.queryBus.execute(
      new FindClassroomsEnrollmentByIdQuery(data)
    );
  }
}
