import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllImagesInput,
  WhereDataFindAllImagesInput
} from '@/controllers/graphql/inputs/images/find-all-images.input';
import { Image } from '@/controllers/graphql/types/image';
import { Images } from '@/controllers/graphql/types/images';
import { FindAllImagesService } from '@/services/images/find-all-images';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly findAllImagesService: FindAllImagesService) {}

  @Query(() => Images)
  async images(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllImagesInput, nullable: true })
    where: WhereDataFindAllImagesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllImagesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllImagesInput
  ) {
    return await this.findAllImagesService.execute({
      page,
      where,
      orderBy
    });
  }
}
