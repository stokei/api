import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { HeroMapper } from '@/mappers/heros';
import { HeroModel } from '@/models/hero.model';

@Injectable()
export class FindHeroByIdRepository
  implements IBaseRepository<string, Promise<HeroModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<HeroModel> {
    return new HeroMapper().toModel(
      await this.model.hero.findUnique({
        where: { id }
      })
    );
  }
}
