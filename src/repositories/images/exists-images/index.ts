import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsImagesDTO } from '@/dtos/images/exists-images.dto';

@Injectable()
export class ExistsImagesRepository
  implements IBaseRepository<ExistsImagesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsImagesDTO): Promise<boolean> {
    return (await this.model.image.count({ where })) > 0;
  }
}
