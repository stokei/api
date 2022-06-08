import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsTagsDTO } from '@/dtos/tags/exists-tags.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsTagsRepository
  implements IBaseRepository<ExistsTagsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsTagsDTO): Promise<boolean> {
    return (await this.model.tag.count({ where })) > 0;
  }
}
