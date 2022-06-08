import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveCardDTO } from '@/dtos/cards/remove-card.dto';

@Injectable()
export class RemoveCardRepository
  implements IBaseRepository<RemoveCardDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCardDTO): Promise<boolean> {
    const removed = await this.model.card.delete({
      where: {
        id: where?.cardId
      }
    });
    return !!removed;
  }
}
