import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateHeroDTO } from '@/dtos/heros/update-hero.dto';

@Injectable()
export class UpdateHeroRepository
  implements IBaseRepository<UpdateHeroDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateHeroDTO): Promise<boolean> {
    const updated = await this.model.hero.update({
      where: {
        id: where?.hero
      },
      data
    });
    return !!updated;
  }
}
