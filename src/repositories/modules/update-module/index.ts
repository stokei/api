import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateModuleDTO } from '@/dtos/modules/update-module.dto';

@Injectable()
export class UpdateModuleRepository
  implements IBaseRepository<UpdateModuleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateModuleDTO): Promise<boolean> {
    const updated = await this.model.module.update({
      where: {
        id: where?.moduleId
      },
      data
    });
    return !!updated;
  }
}
