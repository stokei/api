import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateModulesMaterialDTO } from '@/dtos/modules-materials/update-modules-material.dto';

@Injectable()
export class UpdateModulesMaterialRepository
  implements IBaseRepository<UpdateModulesMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateModulesMaterialDTO): Promise<boolean> {
    const updated = await this.model.modulesMaterial.update({
      where: {
        id: where?.modulesMaterialId
      },
      data
    });
    return !!updated;
  }
}
