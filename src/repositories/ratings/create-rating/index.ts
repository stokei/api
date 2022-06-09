import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateRatingDTO } from '@/dtos/ratings/create-rating.dto';
import { RatingMapper } from '@/mappers/ratings';
import { RatingModel } from '@/models/rating.model';

@Injectable()
export class CreateRatingRepository
  implements IBaseRepository<CreateRatingDTO, Promise<RatingModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateRatingDTO): Promise<RatingModel> {
    return new RatingMapper().toModel(await this.model.rating.create({ data }));
  }
}
