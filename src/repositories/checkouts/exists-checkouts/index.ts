import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCheckoutsDTO } from '@/dtos/checkouts/exists-checkouts.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCheckoutsRepository
  implements IBaseRepository<ExistsCheckoutsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCheckoutsDTO): Promise<boolean> {
    return (await this.model.checkout.count({ where })) > 0;
  }
}
