import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateRatingDTO } from '@/dtos/ratings/update-rating.dto';

@Injectable()
export class UpdateRatingRepository
  implements IBaseRepository<UpdateRatingDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateRatingDTO): Promise<boolean> {
    const updated = await this.model.rating.update({
      where: {
        id: where?.ratingId
      },
      data
    });
    return !!updated;
  }
}
