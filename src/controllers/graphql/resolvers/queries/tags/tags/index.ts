import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllTagsInput,
  WhereDataFindAllTagsInput
} from '@/controllers/graphql/inputs/tags/find-all-tags.input';
import { Tag } from '@/controllers/graphql/types/tag';
import { Tags } from '@/controllers/graphql/types/tags';
import { FindAllTagsService } from '@/services/tags/find-all-tags';

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly findAllTagsService: FindAllTagsService) {}

  @Query(() => Tags)
  async tags(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllTagsInput, nullable: true })
    where: WhereDataFindAllTagsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllTagsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllTagsInput
  ) {
    return await this.findAllTagsService.execute({
      page,
      where,
      orderBy
    });
  }
}
