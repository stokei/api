import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsVideoAuthorsDTO } from '@/dtos/video-authors/exists-video-authors.dto';

@Injectable()
export class ExistsVideoAuthorsRepository
  implements IBaseRepository<ExistsVideoAuthorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsVideoAuthorsDTO): Promise<boolean> {
    return (await this.model.videoAuthor.count({ where })) > 0;
  }
}
