import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsPhonesDTO } from '@/dtos/phones/exists-phones.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsPhonesRepository
  implements IBaseRepository<ExistsPhonesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsPhonesDTO): Promise<boolean> {
    return (await this.model.phone.count({ where })) > 0;
  }
}
