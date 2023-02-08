import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllVideosInput } from '@/controllers/graphql/inputs/videos/find-all-videos.input';
import { Module } from '@/controllers/graphql/types/module';
import { Videos } from '@/controllers/graphql/types/videos';
import { ModuleModel } from '@/models/module.model';
import { FindAllVideosService } from '@/services/videos/find-all-videos';

@Resolver(() => Module)
export class ModuleVideosResolver {
  constructor(private readonly findAllVideosService: FindAllVideosService) {}

  @ResolveField(() => Videos, { nullable: true })
  videos(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideosInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideosInput,
    @Parent() module: ModuleModel
  ) {
    return this.findAllVideosService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: module.id
          }
        }
      }
    });
  }
}
