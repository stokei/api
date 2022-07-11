import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindPaymentMethodByIdQuery } from '@/queries/implements/payment-methods/find-payment-method-by-id.query';
import { FindPaymentMethodByIdRepository } from '@/repositories/payment-methods/find-payment-method-by-id';

@QueryHandler(FindPaymentMethodByIdQuery)
export class FindPaymentMethodByIdQueryHandler
  implements IQueryHandler<FindPaymentMethodByIdQuery>
{
  constructor(
    private readonly findPaymentMethodByIdRepository: FindPaymentMethodByIdRepository
  ) {}

  async execute(
    query: FindPaymentMethodByIdQuery
  ): Promise<PaymentMethodModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const paymentMethod = await this.findPaymentMethodByIdRepository.execute(
      id
    );
    if (!paymentMethod) {
      throw new PaymentMethodNotFoundException();
    }
    return paymentMethod;
  }
}
