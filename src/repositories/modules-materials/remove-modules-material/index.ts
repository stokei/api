import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveModulesMaterialDTO } from '@/dtos/modules-materials/remove-modules-material.dto';

@Injectable()
export class RemoveModulesMaterialRepository
  implements IBaseRepository<RemoveModulesMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveModulesMaterialDTO): Promise<boolean> {
    const removed = await this.model.modulesMaterial.delete({
      where: {
        id: where?.modulesMaterialId
      }
    });
    return !!removed;
  }
}
