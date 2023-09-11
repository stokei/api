import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveComponentDTO } from '@/dtos/components/remove-component.dto';

@Injectable()
export class RemoveComponentRepository
  implements IBaseRepository<RemoveComponentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveComponentDTO): Promise<boolean> {
    const removed = await this.model.component.delete({
      where: {
        id: where?.component
      }
    });
    return !!removed;
  }
}
