import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CheckoutNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CheckoutModel } from '@/models/checkout.model';
import { FindCheckoutByIdQuery } from '@/queries/implements/checkouts/find-checkout-by-id.query';
import { FindCheckoutByIdRepository } from '@/repositories/checkouts/find-checkout-by-id';

@QueryHandler(FindCheckoutByIdQuery)
export class FindCheckoutByIdQueryHandler
  implements IQueryHandler<FindCheckoutByIdQuery>
{
  constructor(
    private readonly findCheckoutByIdRepository: FindCheckoutByIdRepository
  ) {}

  async execute(query: FindCheckoutByIdQuery): Promise<CheckoutModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const checkout = await this.findCheckoutByIdRepository.execute(id);
    if (!checkout) {
      throw new CheckoutNotFoundException();
    }
    return checkout;
  }
}
