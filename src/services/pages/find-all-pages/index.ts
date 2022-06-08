import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { PageModel } from '@/models/page.model';
import { FindAllPagesDTO } from '@/dtos/pages/find-all-pages.dto';
import { FindAllPagesQuery } from '@/queries/implements/pages/find-all-pages.query';

@Injectable()
export class FindAllPagesService
  implements IBaseService<FindAllPagesDTO, Promise<IPaginatedType<PageModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllPagesDTO): Promise<IPaginatedType<PageModel>> {
    return await this.queryBus.execute(new FindAllPagesQuery(data));
  }
}
