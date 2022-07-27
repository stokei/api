import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveColorDTO } from '@/dtos/colors/remove-color.dto';

@Injectable()
export class RemoveColorRepository
  implements IBaseRepository<RemoveColorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveColorDTO): Promise<boolean> {
    const removed = await this.model.color.delete({
      where: {
        id: where?.color
      }
    });
    return !!removed;
  }
}
