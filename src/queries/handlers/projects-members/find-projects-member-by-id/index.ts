import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  ProjectsMemberNotFoundException
} from '@/errors';
import { ProjectsMemberModel } from '@/models/projects-member.model';
import { FindProjectsMemberByIdQuery } from '@/queries/implements/projects-members/find-projects-member-by-id.query';
import { FindProjectsMemberByIdRepository } from '@/repositories/projects-members/find-projects-member-by-id';

@QueryHandler(FindProjectsMemberByIdQuery)
export class FindProjectsMemberByIdQueryHandler
  implements IQueryHandler<FindProjectsMemberByIdQuery>
{
  constructor(
    private readonly findProjectsMemberByIdRepository: FindProjectsMemberByIdRepository
  ) {}

  async execute(
    query: FindProjectsMemberByIdQuery
  ): Promise<ProjectsMemberModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const projectsMember = await this.findProjectsMemberByIdRepository.execute(
      id
    );
    if (!projectsMember) {
      throw new ProjectsMemberNotFoundException();
    }
    return projectsMember;
  }
}
