import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountImagesDTO } from '@/dtos/images/count-images.dto';
import { ImageMapper } from '@/mappers/images';

@Injectable()
export class CountImagesRepository
  implements IBaseRepository<CountImagesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountImagesDTO): Promise<number> {
    const imageMapper = new ImageMapper();
    return await this.model.image.count({
      where: imageMapper.toWhereFindAllPrisma(where)
    });
  }
}
