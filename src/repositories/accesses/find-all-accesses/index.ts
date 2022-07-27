import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAccessesDTO } from '@/dtos/accesses/find-all-accesses.dto';
import { AccessMapper } from '@/mappers/accesses';
import { AccessModel } from '@/models/access.model';

@Injectable()
export class FindAllAccessesRepository
  implements IBaseRepository<FindAllAccessesDTO, Promise<AccessModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAccessesDTO): Promise<AccessModel[]> {
    const accessMapper = new AccessMapper();
    return accessMapper.toModels(
      await this.model.access.findMany(accessMapper.toFindAllPrisma(data))
    );
  }
}
