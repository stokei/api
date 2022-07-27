import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ImageMapper } from '@/mappers/images';
import { ImageModel } from '@/models/image.model';
import { FindAllImagesQuery } from '@/queries/implements/images/find-all-images.query';
import { CountImagesRepository } from '@/repositories/images/count-images';
import { FindAllImagesRepository } from '@/repositories/images/find-all-images';

@QueryHandler(FindAllImagesQuery)
export class FindAllImagesQueryHandler
  implements IQueryHandler<FindAllImagesQuery>
{
  constructor(
    private readonly findAllImageRepository: FindAllImagesRepository,
    private readonly countImagesRepository: CountImagesRepository
  ) {}

  async execute(
    query: FindAllImagesQuery
  ): Promise<IPaginatedType<ImageModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ImageMapper().toFindAllQueryClean(query);
    const images = await this.findAllImageRepository.execute(data);
    const totalCount = await this.countImagesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ImageModel>().toPaginationList({
      items: images,
      page: data.page,
      totalCount
    });
  }
}
