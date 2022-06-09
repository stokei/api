import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCardDTO } from '@/dtos/cards/create-card.dto';
import { CardMapper } from '@/mappers/cards';
import { CardModel } from '@/models/card.model';

@Injectable()
export class CreateCardRepository
  implements IBaseRepository<CreateCardDTO, Promise<CardModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCardDTO): Promise<CardModel> {
    return new CardMapper().toModel(await this.model.card.create({ data }));
  }
}
