import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ImageModel } from '@/models/image.model';
import { FindAllImagesDTO } from '@/dtos/images/find-all-images.dto';
import { FindAllImagesQuery } from '@/queries/implements/images/find-all-images.query';

@Injectable()
export class FindAllImagesService
  implements
    IBaseService<FindAllImagesDTO, Promise<IPaginatedType<ImageModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllImagesDTO): Promise<IPaginatedType<ImageModel>> {
    return await this.queryBus.execute(new FindAllImagesQuery(data));
  }
}
