import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ImageModel } from '@/models/image.model';
import { FindImageByIdQuery } from '@/queries/implements/images/find-image-by-id.query';

@Injectable()
export class FindImageByIdService
  implements IBaseService<string, Promise<ImageModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ImageModel> {
    return await this.queryBus.execute(new FindImageByIdQuery(data));
  }
}
