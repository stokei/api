import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateHeroDTO } from '@/dtos/heros/create-hero.dto';
import { HeroMapper } from '@/mappers/heros';
import { HeroModel } from '@/models/hero.model';

@Injectable()
export class CreateHeroRepository
  implements IBaseRepository<CreateHeroDTO, Promise<HeroModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateHeroDTO): Promise<HeroModel> {
    return new HeroMapper().toModel(await this.model.hero.create({ data }));
  }
}
