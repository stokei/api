import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ProjectModel } from '@/models/project.model';
import { FindAllProjectsDTO } from '@/dtos/projects/find-all-projects.dto';
import { FindAllProjectsQuery } from '@/queries/implements/projects/find-all-projects.query';

@Injectable()
export class FindAllProjectsService
  implements
    IBaseService<FindAllProjectsDTO, Promise<IPaginatedType<ProjectModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProjectsDTO
  ): Promise<IPaginatedType<ProjectModel>> {
    return await this.queryBus.execute(new FindAllProjectsQuery(data));
  }
}
