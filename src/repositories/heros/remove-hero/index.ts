import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveHeroDTO } from '@/dtos/heros/remove-hero.dto';

@Injectable()
export class RemoveHeroRepository
  implements IBaseRepository<RemoveHeroDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveHeroDTO): Promise<boolean> {
    const removed = await this.model.hero.delete({
      where: {
        id: where?.hero
      }
    });
    return !!removed;
  }
}
