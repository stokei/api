import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ProjectNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ProjectModel } from '@/models/project.model';
import { FindProjectByIdRepository } from '@/repositories/projects/find-project-by-id';
import { FindProjectByIdQuery } from '@/queries/implements/projects/find-project-by-id.query';

@QueryHandler(FindProjectByIdQuery)
export class FindProjectByIdQueryHandler
  implements IQueryHandler<FindProjectByIdQuery>
{
  constructor(
    private readonly findProjectByIdRepository: FindProjectByIdRepository
  ) {}

  async execute(query: FindProjectByIdQuery): Promise<ProjectModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const project = await this.findProjectByIdRepository.execute(id);
    if (!project) {
      throw new ProjectNotFoundException();
    }
    return project;
  }
}
