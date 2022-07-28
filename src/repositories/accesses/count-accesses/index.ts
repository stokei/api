import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAccessesDTO } from '@/dtos/accesses/count-accesses.dto';
import { AccessMapper } from '@/mappers/accesses';

@Injectable()
export class CountAccessesRepository
  implements IBaseRepository<CountAccessesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAccessesDTO): Promise<number> {
    const accessMapper = new AccessMapper();
    return await this.model.access.count({
      where: accessMapper.toWhereFindAllPrisma(where)
    });
  }
}
