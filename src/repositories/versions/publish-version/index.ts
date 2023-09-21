import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PublishVersionRepositoryDTO } from '@/dtos/versions/publish-version-repository.dto';

@Injectable()
export class PublishVersionRepository
  implements IBaseRepository<PublishVersionRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: PublishVersionRepositoryDTO): Promise<boolean> {
    const updated = await this.model.version.update({
      where: {
        id: data?.version,
        app: data?.app
      },
      data: {
        published: !!data?.published
      }
    });
    return !!updated;
  }
}
