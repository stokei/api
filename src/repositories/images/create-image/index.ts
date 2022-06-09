import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateImageDTO } from '@/dtos/images/create-image.dto';
import { ImageMapper } from '@/mappers/images';
import { ImageModel } from '@/models/image.model';

@Injectable()
export class CreateImageRepository
  implements IBaseRepository<CreateImageDTO, Promise<ImageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateImageDTO): Promise<ImageModel> {
    return new ImageMapper().toModel(await this.model.image.create({ data }));
  }
}
