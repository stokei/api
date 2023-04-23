import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllInvoicesInput,
  WhereDataFindAllInvoicesInput
} from '@/controllers/graphql/inputs/invoices/find-all-invoices.input';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { Invoices } from '@/controllers/graphql/types/invoices';
import { FindAllInvoicesService } from '@/services/invoices/find-all-invoices';

@Resolver(() => Invoice)
export class InvoicesResolver {
  constructor(
    private readonly findAllInvoicesService: FindAllInvoicesService
  ) {}

  @Query(() => Invoices)
  async invoices(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllInvoicesInput,
      nullable: true
    })
    where: WhereDataFindAllInvoicesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllInvoicesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllInvoicesInput
  ) {
    return await this.findAllInvoicesService.execute({
      page,
      where,
      orderBy
    });
  }
}
