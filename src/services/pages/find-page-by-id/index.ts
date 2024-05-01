import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PageModel } from '@/models/page.model';
import { FindPageByIdQuery } from '@/queries/implements/pages/find-page-by-id.query';

@Injectable()
export class FindPageByIdService
  implements IBaseService<string, Promise<PageModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PageModel> {
    return await this.queryBus.execute(new FindPageByIdQuery(data));
  }
}
