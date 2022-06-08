import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ClassroomsPlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';
import { FindClassroomsPlanByIdRepository } from '@/repositories/classrooms-plans/find-classrooms-plan-by-id';
import { FindClassroomsPlanByIdQuery } from '@/queries/implements/classrooms-plans/find-classrooms-plan-by-id.query';

@QueryHandler(FindClassroomsPlanByIdQuery)
export class FindClassroomsPlanByIdQueryHandler
  implements IQueryHandler<FindClassroomsPlanByIdQuery>
{
  constructor(
    private readonly findClassroomsPlanByIdRepository: FindClassroomsPlanByIdRepository
  ) {}

  async execute(
    query: FindClassroomsPlanByIdQuery
  ): Promise<ClassroomsPlanModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsPlan = await this.findClassroomsPlanByIdRepository.execute(
      id
    );
    if (!classroomsPlan) {
      throw new ClassroomsPlanNotFoundException();
    }
    return classroomsPlan;
  }
}
