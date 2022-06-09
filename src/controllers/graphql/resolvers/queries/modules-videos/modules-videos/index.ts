import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllModulesVideosInput,
  WhereDataFindAllModulesVideosInput
} from '@/controllers/graphql/inputs/modules-videos/find-all-modules-videos.input';
import { ModulesVideo } from '@/controllers/graphql/types/modules-video';
import { ModulesVideos } from '@/controllers/graphql/types/modules-videos';
import { FindAllModulesVideosService } from '@/services/modules-videos/find-all-modules-videos';

@Resolver(() => ModulesVideo)
export class ModulesVideosResolver {
  constructor(
    private readonly findAllModulesVideosService: FindAllModulesVideosService
  ) {}

  @Query(() => ModulesVideos)
  async modulesVideos(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllModulesVideosInput,
      nullable: true
    })
    where: WhereDataFindAllModulesVideosInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllModulesVideosInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllModulesVideosInput
  ) {
    return await this.findAllModulesVideosService.execute({
      page,
      where,
      orderBy
    });
  }
}
