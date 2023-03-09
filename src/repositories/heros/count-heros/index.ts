import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountHerosDTO } from '@/dtos/heros/count-heros.dto';
import { HeroMapper } from '@/mappers/heros';

@Injectable()
export class CountHerosRepository
  implements IBaseRepository<CountHerosDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountHerosDTO): Promise<number> {
    const heroMapper = new HeroMapper();
    return await this.model.hero.count({
      where: heroMapper.toWhereFindAllPrisma(where)
    });
  }
}
