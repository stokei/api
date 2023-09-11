import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveSiteDTO } from '@/dtos/sites/remove-site.dto';

@Injectable()
export class RemoveSiteRepository
  implements IBaseRepository<RemoveSiteDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveSiteDTO): Promise<boolean> {
    const removed = await this.model.site.delete({
      where: {
        id: where?.site
      }
    });
    return !!removed;
  }
}
