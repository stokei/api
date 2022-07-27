import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveImageDTO } from '@/dtos/images/remove-image.dto';

@Injectable()
export class RemoveImageRepository
  implements IBaseRepository<RemoveImageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveImageDTO): Promise<boolean> {
    const removed = await this.model.image.delete({
      where: {
        id: where?.image
      }
    });
    return !!removed;
  }
}
