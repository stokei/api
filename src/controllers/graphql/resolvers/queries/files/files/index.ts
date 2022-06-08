import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllFilesInput,
  WhereDataFindAllFilesInput
} from '@/controllers/graphql/inputs/files/find-all-files.input';
import { File } from '@/controllers/graphql/types/file';
import { Files } from '@/controllers/graphql/types/files';
import { FindAllFilesService } from '@/services/files/find-all-files';

@Resolver(() => File)
export class FilesResolver {
  constructor(private readonly findAllFilesService: FindAllFilesService) {}

  @Query(() => Files)
  async files(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllFilesInput, nullable: true })
    where: WhereDataFindAllFilesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllFilesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllFilesInput
  ) {
    return await this.findAllFilesService.execute({
      page,
      where,
      orderBy
    });
  }
}
