import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsSitesDTO } from '@/dtos/sites/exists-sites.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsSitesRepository
  implements IBaseRepository<ExistsSitesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsSitesDTO): Promise<boolean> {
    return (await this.model.site.count({ where })) > 0;
  }
}
