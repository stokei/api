import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CardMapper } from '@/mappers/cards';
import { CardModel } from '@/models/card.model';

@Injectable()
export class FindCardByIdRepository
  implements IBaseRepository<string, Promise<CardModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CardModel> {
    return new CardMapper().toModel(
      await this.model.card.findUnique({
        where: { id }
      })
    );
  }
}
