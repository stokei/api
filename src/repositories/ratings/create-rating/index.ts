import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RatingMapper } from '@/mappers/ratings';
import { CreateRatingDTO } from '@/dtos/ratings/create-rating.dto';
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
