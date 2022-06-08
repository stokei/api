import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  PaymentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { PaymentModel } from '@/models/payment.model';
import { FindPaymentByIdRepository } from '@/repositories/payments/find-payment-by-id';
import { FindPaymentByIdQuery } from '@/queries/implements/payments/find-payment-by-id.query';

@QueryHandler(FindPaymentByIdQuery)
export class FindPaymentByIdQueryHandler
  implements IQueryHandler<FindPaymentByIdQuery>
{
  constructor(
    private readonly findPaymentByIdRepository: FindPaymentByIdRepository
  ) {}

  async execute(query: FindPaymentByIdQuery): Promise<PaymentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const payment = await this.findPaymentByIdRepository.execute(id);
    if (!payment) {
      throw new PaymentNotFoundException();
    }
    return payment;
  }
}
