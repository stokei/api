import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllClassroomsEnrollmentsDTO } from '@/dtos/classrooms-enrollments/find-all-classrooms-enrollments.dto';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';
import { FindAllClassroomsEnrollmentsQuery } from '@/queries/implements/classrooms-enrollments/find-all-classrooms-enrollments.query';

@Injectable()
export class FindAllClassroomsEnrollmentsService
  implements
    IBaseService<
      FindAllClassroomsEnrollmentsDTO,
      Promise<IPaginatedType<ClassroomsEnrollmentModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsEnrollmentsDTO
  ): Promise<IPaginatedType<ClassroomsEnrollmentModel>> {
    return await this.queryBus.execute(
      new FindAllClassroomsEnrollmentsQuery(data)
    );
  }
}
