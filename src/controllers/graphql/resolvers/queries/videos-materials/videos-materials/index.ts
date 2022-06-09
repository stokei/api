import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosMaterialsInput,
  WhereDataFindAllVideosMaterialsInput
} from '@/controllers/graphql/inputs/videos-materials/find-all-videos-materials.input';
import { VideosMaterial } from '@/controllers/graphql/types/videos-material';
import { VideosMaterials } from '@/controllers/graphql/types/videos-materials';
import { FindAllVideosMaterialsService } from '@/services/videos-materials/find-all-videos-materials';

@Resolver(() => VideosMaterial)
export class VideosMaterialsResolver {
  constructor(
    private readonly findAllVideosMaterialsService: FindAllVideosMaterialsService
  ) {}

  @Query(() => VideosMaterials)
  async videosMaterials(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllVideosMaterialsInput,
      nullable: true
    })
    where: WhereDataFindAllVideosMaterialsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideosMaterialsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideosMaterialsInput
  ) {
    return await this.findAllVideosMaterialsService.execute({
      page,
      where,
      orderBy
    });
  }
}
