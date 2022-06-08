import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ImageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ImageModel } from '@/models/image.model';
import { FindImageByIdRepository } from '@/repositories/images/find-image-by-id';
import { FindImageByIdQuery } from '@/queries/implements/images/find-image-by-id.query';

@QueryHandler(FindImageByIdQuery)
export class FindImageByIdQueryHandler
  implements IQueryHandler<FindImageByIdQuery>
{
  constructor(
    private readonly findImageByIdRepository: FindImageByIdRepository
  ) {}

  async execute(query: FindImageByIdQuery): Promise<ImageModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const image = await this.findImageByIdRepository.execute(id);
    if (!image) {
      throw new ImageNotFoundException();
    }
    return image;
  }
}
