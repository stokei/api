import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateComponentDTO } from '@/dtos/components/update-component.dto';

@Injectable()
export class UpdateComponentRepository
  implements IBaseRepository<UpdateComponentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateComponentDTO): Promise<boolean> {
    const updated = await this.model.component.update({
      where: {
        id: where?.component
      },
      data
    });
    return !!updated;
  }
}
