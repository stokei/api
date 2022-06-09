import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCheckoutsDTO } from '@/dtos/checkouts/find-all-checkouts.dto';
import { CheckoutModel } from '@/models/checkout.model';
import { FindAllCheckoutsQuery } from '@/queries/implements/checkouts/find-all-checkouts.query';

@Injectable()
export class FindAllCheckoutsService
  implements
    IBaseService<FindAllCheckoutsDTO, Promise<IPaginatedType<CheckoutModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCheckoutsDTO
  ): Promise<IPaginatedType<CheckoutModel>> {
    return await this.queryBus.execute(new FindAllCheckoutsQuery(data));
  }
}
