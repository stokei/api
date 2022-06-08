import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';
import { FindAllClassroomsPlansDTO } from '@/dtos/classrooms-plans/find-all-classrooms-plans.dto';
import { FindAllClassroomsPlansQuery } from '@/queries/implements/classrooms-plans/find-all-classrooms-plans.query';

@Injectable()
export class FindAllClassroomsPlansService
  implements
    IBaseService<
      FindAllClassroomsPlansDTO,
      Promise<IPaginatedType<ClassroomsPlanModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllClassroomsPlansDTO
  ): Promise<IPaginatedType<ClassroomsPlanModel>> {
    return await this.queryBus.execute(new FindAllClassroomsPlansQuery(data));
  }
}
