import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PaymentModel } from '@/models/payment.model';
import { FindPaymentByIdQuery } from '@/queries/implements/payments/find-payment-by-id.query';

@Injectable()
export class FindPaymentByIdService
  implements IBaseService<string, Promise<PaymentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PaymentModel> {
    return await this.queryBus.execute(new FindPaymentByIdQuery(data));
  }
}
