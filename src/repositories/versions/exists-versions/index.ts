import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsVersionsDTO } from '@/dtos/versions/exists-versions.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsVersionsRepository
  implements IBaseRepository<ExistsVersionsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsVersionsDTO): Promise<boolean> {
    return (await this.model.version.count({ where })) > 0;
  }
}
