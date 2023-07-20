import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateMaterialDTO } from '@/dtos/materials/update-material.dto';

@Injectable()
export class UpdateMaterialRepository
  implements IBaseRepository<UpdateMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateMaterialDTO): Promise<boolean> {
    const updated = await this.model.material.update({
      where: {
        id: where?.material
      },
      data
    });
    return !!updated;
  }
}
