import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsRatingsDTO } from '@/dtos/ratings/exists-ratings.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsRatingsRepository
  implements IBaseRepository<ExistsRatingsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsRatingsDTO): Promise<boolean> {
    return (await this.model.rating.count({ where })) > 0;
  }
}
