import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemovePageDTO } from '@/dtos/pages/remove-page.dto';

@Injectable()
export class RemovePageRepository
  implements IBaseRepository<RemovePageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePageDTO): Promise<boolean> {
    const removed = await this.model.page.delete({
      where: {
        id: where?.page
      }
    });
    return !!removed;
  }
}
