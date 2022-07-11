import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllModuleVideosInput,
  WhereDataFindAllModuleVideosInput
} from '@/controllers/graphql/inputs/module-videos/find-all-module-videos.input';
import { ModuleVideo } from '@/controllers/graphql/types/module-video';
import { ModuleVideos } from '@/controllers/graphql/types/module-videos';
import { FindAllModuleVideosService } from '@/services/module-videos/find-all-module-videos';

@Resolver(() => ModuleVideo)
export class ModuleVideosResolver {
  constructor(
    private readonly findAllModuleVideosService: FindAllModuleVideosService
  ) {}

  @Query(() => ModuleVideos)
  async moduleVideos(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllModuleVideosInput,
      nullable: true
    })
    where: WhereDataFindAllModuleVideosInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllModuleVideosInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllModuleVideosInput
  ) {
    return await this.findAllModuleVideosService.execute({
      page,
      where,
      orderBy
    });
  }
}
