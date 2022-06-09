import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PaymentsMethodModel } from '@/models/payments-method.model';
import { FindPaymentsMethodByIdQuery } from '@/queries/implements/payments-methods/find-payments-method-by-id.query';

@Injectable()
export class FindPaymentsMethodByIdService
  implements IBaseService<string, Promise<PaymentsMethodModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PaymentsMethodModel> {
    return await this.queryBus.execute(new FindPaymentsMethodByIdQuery(data));
  }
}
