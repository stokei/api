import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { CardMapper } from '@/mappers/cards';
import { CreateCardDTO } from '@/dtos/cards/create-card.dto';
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
