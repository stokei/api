import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateVersionDTO } from '@/dtos/versions/update-version.dto';

@Injectable()
export class UpdateVersionRepository
  implements IBaseRepository<UpdateVersionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVersionDTO): Promise<boolean> {
    const updated = await this.model.version.update({
      where: {
        id: where?.version
      },
      data
    });
    return !!updated;
  }
}
