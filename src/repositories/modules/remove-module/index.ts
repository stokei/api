import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveModuleDTO } from '@/dtos/modules/remove-module.dto';

@Injectable()
export class RemoveModuleRepository
  implements IBaseRepository<RemoveModuleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveModuleDTO): Promise<boolean> {
    const removed = await this.model.module.delete({
      where: {
        id: where?.moduleId
      }
    });
    return !!removed;
  }
}
