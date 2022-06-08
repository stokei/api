import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCardDTO } from '@/dtos/cards/update-card.dto';

@Injectable()
export class UpdateCardRepository
  implements IBaseRepository<UpdateCardDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCardDTO): Promise<boolean> {
    const updated = await this.model.card.update({
      where: {
        id: where?.cardId
      },
      data
    });
    return !!updated;
  }
}
