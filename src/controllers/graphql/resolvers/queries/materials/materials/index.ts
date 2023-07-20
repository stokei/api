import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllMaterialsInput,
  WhereDataFindAllMaterialsInput
} from '@/controllers/graphql/inputs/materials/find-all-materials.input';
import { Material } from '@/controllers/graphql/types/material';
import { Materials } from '@/controllers/graphql/types/materials';
import { FindAllMaterialsService } from '@/services/materials/find-all-materials';

@Resolver(() => Material)
export class MaterialsResolver {
  constructor(
    private readonly findAllMaterialsService: FindAllMaterialsService
  ) {}

  @Query(() => Materials)
  async materials(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllMaterialsInput,
      nullable: true
    })
    where: WhereDataFindAllMaterialsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllMaterialsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllMaterialsInput
  ) {
    return await this.findAllMaterialsService.execute({
      page,
      where,
      orderBy
    });
  }
}
