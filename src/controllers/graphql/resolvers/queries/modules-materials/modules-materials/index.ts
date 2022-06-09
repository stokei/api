import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllModulesMaterialsInput,
  WhereDataFindAllModulesMaterialsInput
} from '@/controllers/graphql/inputs/modules-materials/find-all-modules-materials.input';
import { ModulesMaterial } from '@/controllers/graphql/types/modules-material';
import { ModulesMaterials } from '@/controllers/graphql/types/modules-materials';
import { FindAllModulesMaterialsService } from '@/services/modules-materials/find-all-modules-materials';

@Resolver(() => ModulesMaterial)
export class ModulesMaterialsResolver {
  constructor(
    private readonly findAllModulesMaterialsService: FindAllModulesMaterialsService
  ) {}

  @Query(() => ModulesMaterials)
  async modulesMaterials(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllModulesMaterialsInput,
      nullable: true
    })
    where: WhereDataFindAllModulesMaterialsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllModulesMaterialsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllModulesMaterialsInput
  ) {
    return await this.findAllModulesMaterialsService.execute({
      page,
      where,
      orderBy
    });
  }
}
