import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveVersionDTO } from '@/dtos/versions/remove-version.dto';

@Injectable()
export class RemoveVersionRepository
  implements IBaseRepository<RemoveVersionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveVersionDTO): Promise<boolean> {
    const removed = await this.model.version.delete({
      where: {
        id: where?.versionId
      }
    });
    return !!removed;
  }
}
