import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsAccessesDTO } from '@/dtos/accesses/exists-accesses.dto';

@Injectable()
export class ExistsAccessesRepository
  implements IBaseRepository<ExistsAccessesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAccessesDTO): Promise<boolean> {
    return (await this.model.access.count({ where })) > 0;
  }
}
