import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllHerosDTO } from '@/dtos/heros/find-all-heros.dto';
import { HeroMapper } from '@/mappers/heros';
import { HeroModel } from '@/models/hero.model';

@Injectable()
export class FindAllHerosRepository
  implements IBaseRepository<FindAllHerosDTO, Promise<HeroModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllHerosDTO): Promise<HeroModel[]> {
    const heroMapper = new HeroMapper();
    return heroMapper.toModels(
      await this.model.hero.findMany(heroMapper.toFindAllPrisma(data))
    );
  }
}
