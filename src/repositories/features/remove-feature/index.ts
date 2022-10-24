import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveFeatureDTO } from '@/dtos/features/remove-feature.dto';

@Injectable()
export class RemoveFeatureRepository
  implements IBaseRepository<RemoveFeatureDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveFeatureDTO): Promise<boolean> {
    const removed = await this.model.feature.delete({
      where: {
        id: where?.feature
      }
    });
    return !!removed;
  }
}
