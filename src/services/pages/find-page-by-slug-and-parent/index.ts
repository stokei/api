import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindPageBySlugAndParentDTO } from '@/dtos/pages/find-page-by-slug-and-parent.dto';
import { PageModel } from '@/models/page.model';
import { FindPageBySlugAndParentQuery } from '@/queries/implements/pages/find-page-by-slug-and-parent.query';

@Injectable()
export class FindPageBySlugAndParentService
  implements IBaseService<FindPageBySlugAndParentDTO, Promise<PageModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindPageBySlugAndParentDTO): Promise<PageModel> {
    return await this.queryBus.execute(new FindPageBySlugAndParentQuery(data));
  }
}
