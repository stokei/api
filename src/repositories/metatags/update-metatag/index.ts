import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateMetatagDTO } from '@/dtos/metatags/update-metatag.dto';

@Injectable()
export class UpdateMetatagRepository
  implements IBaseRepository<UpdateMetatagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateMetatagDTO): Promise<boolean> {
    const updated = await this.model.metatag.update({
      where: {
        id: where?.metatagId
      },
      data
    });
    return !!updated;
  }
}
