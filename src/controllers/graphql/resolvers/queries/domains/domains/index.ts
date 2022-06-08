import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllDomainsInput,
  WhereDataFindAllDomainsInput
} from '@/controllers/graphql/inputs/domains/find-all-domains.input';
import { Domain } from '@/controllers/graphql/types/domain';
import { Domains } from '@/controllers/graphql/types/domains';
import { FindAllDomainsService } from '@/services/domains/find-all-domains';

@Resolver(() => Domain)
export class DomainsResolver {
  constructor(private readonly findAllDomainsService: FindAllDomainsService) {}

  @Query(() => Domains)
  async domains(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllDomainsInput, nullable: true })
    where: WhereDataFindAllDomainsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllDomainsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllDomainsInput
  ) {
    return await this.findAllDomainsService.execute({
      page,
      where,
      orderBy
    });
  }
}
