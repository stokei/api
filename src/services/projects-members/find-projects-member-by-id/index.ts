import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ProjectsMemberModel } from '@/models/projects-member.model';
import { FindProjectsMemberByIdQuery } from '@/queries/implements/projects-members/find-projects-member-by-id.query';

@Injectable()
export class FindProjectsMemberByIdService
  implements IBaseService<string, Promise<ProjectsMemberModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProjectsMemberModel> {
    return await this.queryBus.execute(new FindProjectsMemberByIdQuery(data));
  }
}
