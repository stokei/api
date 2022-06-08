import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  TagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { TagModel } from '@/models/tag.model';
import { FindTagByIdRepository } from '@/repositories/tags/find-tag-by-id';
import { FindTagByIdQuery } from '@/queries/implements/tags/find-tag-by-id.query';

@QueryHandler(FindTagByIdQuery)
export class FindTagByIdQueryHandler
  implements IQueryHandler<FindTagByIdQuery>
{
  constructor(private readonly findTagByIdRepository: FindTagByIdRepository) {}

  async execute(query: FindTagByIdQuery): Promise<TagModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const tag = await this.findTagByIdRepository.execute(id);
    if (!tag) {
      throw new TagNotFoundException();
    }
    return tag;
  }
}
