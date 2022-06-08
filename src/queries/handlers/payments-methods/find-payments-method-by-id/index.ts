import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  PaymentsMethodNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { PaymentsMethodModel } from '@/models/payments-method.model';
import { FindPaymentsMethodByIdRepository } from '@/repositories/payments-methods/find-payments-method-by-id';
import { FindPaymentsMethodByIdQuery } from '@/queries/implements/payments-methods/find-payments-method-by-id.query';

@QueryHandler(FindPaymentsMethodByIdQuery)
export class FindPaymentsMethodByIdQueryHandler
  implements IQueryHandler<FindPaymentsMethodByIdQuery>
{
  constructor(
    private readonly findPaymentsMethodByIdRepository: FindPaymentsMethodByIdRepository
  ) {}

  async execute(
    query: FindPaymentsMethodByIdQuery
  ): Promise<PaymentsMethodModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const paymentsMethod = await this.findPaymentsMethodByIdRepository.execute(
      id
    );
    if (!paymentsMethod) {
      throw new PaymentsMethodNotFoundException();
    }
    return paymentsMethod;
  }
}
