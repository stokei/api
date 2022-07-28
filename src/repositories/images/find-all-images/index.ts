import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllImagesDTO } from '@/dtos/images/find-all-images.dto';
import { ImageMapper } from '@/mappers/images';
import { ImageModel } from '@/models/image.model';

@Injectable()
export class FindAllImagesRepository
  implements IBaseRepository<FindAllImagesDTO, Promise<ImageModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllImagesDTO): Promise<ImageModel[]> {
    const imageMapper = new ImageMapper();
    return imageMapper.toModels(
      await this.model.image.findMany(imageMapper.toFindAllPrisma(data))
    );
  }
}
