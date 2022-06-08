import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ImageMapper } from '@/mappers/images';
import { ImageModel } from '@/models/image.model';

@Injectable()
export class FindImageByIdRepository
  implements IBaseRepository<string, Promise<ImageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ImageModel> {
    return new ImageMapper().toModel(
      await this.model.image.findUnique({
        where: { id }
      })
    );
  }
}
