import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCardsDTO } from '@/dtos/cards/exists-cards.dto';

@Injectable()
export class ExistsCardsRepository
  implements IBaseRepository<ExistsCardsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCardsDTO): Promise<boolean> {
    return (await this.model.card.count({ where })) > 0;
  }
}
