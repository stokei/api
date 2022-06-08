import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { CheckoutModel } from '@/models/checkout.model';
import { FindCheckoutByIdQuery } from '@/queries/implements/checkouts/find-checkout-by-id.query';

@Injectable()
export class FindCheckoutByIdService
  implements IBaseService<string, Promise<CheckoutModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CheckoutModel> {
    return await this.queryBus.execute(new FindCheckoutByIdQuery(data));
  }
}
