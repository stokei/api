import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ProjectsMemberModel } from '@/models/projects-member.model';
import { FindAllProjectsMembersDTO } from '@/dtos/projects-members/find-all-projects-members.dto';
import { FindAllProjectsMembersQuery } from '@/queries/implements/projects-members/find-all-projects-members.query';

@Injectable()
export class FindAllProjectsMembersService
  implements
    IBaseService<
      FindAllProjectsMembersDTO,
      Promise<IPaginatedType<ProjectsMemberModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProjectsMembersDTO
  ): Promise<IPaginatedType<ProjectsMemberModel>> {
    return await this.queryBus.execute(new FindAllProjectsMembersQuery(data));
  }
}
