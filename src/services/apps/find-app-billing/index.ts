import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAppBillingDTO } from '@/dtos/apps/find-app-billing.dto';
import { BillingModel } from '@/models/billing.model';
import { FindAppBillingQuery } from '@/queries/implements/apps/find-app-billing.query';

@Injectable()
export class FindAppBillingService
  implements IBaseService<FindAppBillingDTO, Promise<BillingModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAppBillingDTO): Promise<BillingModel> {
    return await this.queryBus.execute(new FindAppBillingQuery(data));
  }
}
