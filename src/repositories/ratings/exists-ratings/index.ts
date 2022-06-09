import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsRatingsDTO } from '@/dtos/ratings/exists-ratings.dto';

@Injectable()
export class ExistsRatingsRepository
  implements IBaseRepository<ExistsRatingsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsRatingsDTO): Promise<boolean> {
    return (await this.model.rating.count({ where })) > 0;
  }
}
