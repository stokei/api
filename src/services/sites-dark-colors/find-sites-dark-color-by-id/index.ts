import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';
import { FindSitesDarkColorByIdQuery } from '@/queries/implements/sites-dark-colors/find-sites-dark-color-by-id.query';

@Injectable()
export class FindSitesDarkColorByIdService
  implements IBaseService<string, Promise<SitesDarkColorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SitesDarkColorModel> {
    return await this.queryBus.execute(new FindSitesDarkColorByIdQuery(data));
  }
}
