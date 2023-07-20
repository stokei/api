import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveMaterialDTO } from '@/dtos/materials/remove-material.dto';

@Injectable()
export class RemoveMaterialRepository
  implements IBaseRepository<RemoveMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveMaterialDTO): Promise<boolean> {
    const removed = await this.model.material.delete({
      where: {
        id: where?.material
      }
    });
    return !!removed;
  }
}
