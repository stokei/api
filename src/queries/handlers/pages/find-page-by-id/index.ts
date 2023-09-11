import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  PageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { PageModel } from '@/models/page.model';
import { FindPageByIdQuery } from '@/queries/implements/pages/find-page-by-id.query';
import { FindPageByIdRepository } from '@/repositories/pages/find-page-by-id';

@QueryHandler(FindPageByIdQuery)
export class FindPageByIdQueryHandler
  implements IQueryHandler<FindPageByIdQuery>
{
  constructor(
    private readonly findPageByIdRepository: FindPageByIdRepository
  ) {}

  async execute(query: FindPageByIdQuery): Promise<PageModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const page = await this.findPageByIdRepository.execute(id);
    if (!page) {
      throw new PageNotFoundException();
    }
    return page;
  }
}
