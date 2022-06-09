import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllPaymentsMethodsDTO } from '@/dtos/payments-methods/find-all-payments-methods.dto';
import { PaymentsMethodModel } from '@/models/payments-method.model';
import { FindAllPaymentsMethodsQuery } from '@/queries/implements/payments-methods/find-all-payments-methods.query';

@Injectable()
export class FindAllPaymentsMethodsService
  implements
    IBaseService<
      FindAllPaymentsMethodsDTO,
      Promise<IPaginatedType<PaymentsMethodModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllPaymentsMethodsDTO
  ): Promise<IPaginatedType<PaymentsMethodModel>> {
    return await this.queryBus.execute(new FindAllPaymentsMethodsQuery(data));
  }
}
