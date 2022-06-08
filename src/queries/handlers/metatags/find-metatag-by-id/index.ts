import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  MetatagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { MetatagModel } from '@/models/metatag.model';
import { FindMetatagByIdRepository } from '@/repositories/metatags/find-metatag-by-id';
import { FindMetatagByIdQuery } from '@/queries/implements/metatags/find-metatag-by-id.query';

@QueryHandler(FindMetatagByIdQuery)
export class FindMetatagByIdQueryHandler
  implements IQueryHandler<FindMetatagByIdQuery>
{
  constructor(
    private readonly findMetatagByIdRepository: FindMetatagByIdRepository
  ) {}

  async execute(query: FindMetatagByIdQuery): Promise<MetatagModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const metatag = await this.findMetatagByIdRepository.execute(id);
    if (!metatag) {
      throw new MetatagNotFoundException();
    }
    return metatag;
  }
}
