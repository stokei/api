import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllVersionsInput,
  WhereDataFindAllVersionsInput
} from '@/controllers/graphql/inputs/versions/find-all-versions.input';
import { Version } from '@/controllers/graphql/types/version';
import { Versions } from '@/controllers/graphql/types/versions';
import { FindAllVersionsService } from '@/services/versions/find-all-versions';

@Resolver(() => Version)
export class VersionsResolver {
  constructor(
    private readonly findAllVersionsService: FindAllVersionsService
  ) {}

  @Query(() => Versions)
  async versions(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllVersionsInput,
      nullable: true
    })
    where: WhereDataFindAllVersionsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVersionsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVersionsInput
  ) {
    return await this.findAllVersionsService.execute({
      page,
      where,
      orderBy
    });
  }
}
