import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { TagModel } from '@/models/tag.model';
import { FindAllTagsDTO } from '@/dtos/tags/find-all-tags.dto';
import { FindAllTagsQuery } from '@/queries/implements/tags/find-all-tags.query';

@Injectable()
export class FindAllTagsService
  implements IBaseService<FindAllTagsDTO, Promise<IPaginatedType<TagModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllTagsDTO): Promise<IPaginatedType<TagModel>> {
    return await this.queryBus.execute(new FindAllTagsQuery(data));
  }
}
