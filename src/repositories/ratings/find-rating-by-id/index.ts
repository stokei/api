import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { RatingMapper } from '@/mappers/ratings';
import { RatingModel } from '@/models/rating.model';

@Injectable()
export class FindRatingByIdRepository
  implements IBaseRepository<string, Promise<RatingModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<RatingModel> {
    return new RatingMapper().toModel(
      await this.model.rating.findUnique({
        where: { id }
      })
    );
  }
}
