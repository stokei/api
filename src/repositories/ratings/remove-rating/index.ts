import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveRatingDTO } from '@/dtos/ratings/remove-rating.dto';

@Injectable()
export class RemoveRatingRepository
  implements IBaseRepository<RemoveRatingDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveRatingDTO): Promise<boolean> {
    const removed = await this.model.rating.delete({
      where: {
        id: where?.ratingId
      }
    });
    return !!removed;
  }
}
