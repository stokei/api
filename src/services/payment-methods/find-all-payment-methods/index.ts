import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllPaymentMethodsDTO } from '@/dtos/payment-methods/find-all-payment-methods.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindAllPaymentMethodsQuery } from '@/queries/implements/payment-methods/find-all-payment-methods.query';

@Injectable()
export class FindAllPaymentMethodsService
  implements
    IBaseService<
      FindAllPaymentMethodsDTO,
      Promise<IPaginatedType<PaymentMethodModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllPaymentMethodsDTO
  ): Promise<IPaginatedType<PaymentMethodModel>> {
    return await this.queryBus.execute(new FindAllPaymentMethodsQuery(data));
  }
}
