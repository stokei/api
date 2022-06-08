import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsImagesDTO } from '@/dtos/images/exists-images.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsImagesRepository
  implements IBaseRepository<ExistsImagesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsImagesDTO): Promise<boolean> {
    return (await this.model.image.count({ where })) > 0;
  }
}
