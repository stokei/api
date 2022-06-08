import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { TagModel } from '@/models/tag.model';
import { FindTagByIdQuery } from '@/queries/implements/tags/find-tag-by-id.query';

@Injectable()
export class FindTagByIdService
  implements IBaseService<string, Promise<TagModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<TagModel> {
    return await this.queryBus.execute(new FindTagByIdQuery(data));
  }
}
