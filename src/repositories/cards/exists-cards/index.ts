import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCardsDTO } from '@/dtos/cards/exists-cards.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCardsRepository
  implements IBaseRepository<ExistsCardsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCardsDTO): Promise<boolean> {
    return (await this.model.card.count({ where })) > 0;
  }
}
