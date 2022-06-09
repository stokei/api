import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveSitesLightColorDTO } from '@/dtos/sites-light-colors/remove-sites-light-color.dto';

@Injectable()
export class RemoveSitesLightColorRepository
  implements IBaseRepository<RemoveSitesLightColorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveSitesLightColorDTO): Promise<boolean> {
    const removed = await this.model.sitesLightColor.delete({
      where: {
        id: where?.sitesLightColorId
      }
    });
    return !!removed;
  }
}
