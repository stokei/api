import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateFeatureDTO } from '@/dtos/features/update-feature.dto';

@Injectable()
export class UpdateFeatureRepository
  implements IBaseRepository<UpdateFeatureDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateFeatureDTO): Promise<boolean> {
    const updated = await this.model.feature.update({
      where: {
        id: where?.feature
      },
      data
    });
    return !!updated;
  }
}
