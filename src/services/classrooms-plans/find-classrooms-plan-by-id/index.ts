import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';
import { FindClassroomsPlanByIdQuery } from '@/queries/implements/classrooms-plans/find-classrooms-plan-by-id.query';

@Injectable()
export class FindClassroomsPlanByIdService
  implements IBaseService<string, Promise<ClassroomsPlanModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ClassroomsPlanModel> {
    return await this.queryBus.execute(new FindClassroomsPlanByIdQuery(data));
  }
}
