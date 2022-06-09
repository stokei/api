import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllPaymentsDTO } from '@/dtos/payments/find-all-payments.dto';
import { PaymentModel } from '@/models/payment.model';
import { FindAllPaymentsQuery } from '@/queries/implements/payments/find-all-payments.query';

@Injectable()
export class FindAllPaymentsService
  implements
    IBaseService<FindAllPaymentsDTO, Promise<IPaginatedType<PaymentModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllPaymentsDTO
  ): Promise<IPaginatedType<PaymentModel>> {
    return await this.queryBus.execute(new FindAllPaymentsQuery(data));
  }
}
