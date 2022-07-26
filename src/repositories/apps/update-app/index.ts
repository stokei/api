import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateAppDTO } from '@/dtos/apps/update-app.dto';

@Injectable()
export class UpdateAppRepository
  implements IBaseRepository<UpdateAppDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateAppDTO): Promise<boolean> {
    const updated = await this.model.app.update({
      where: {
        id: where?.appId
      },
      data
    });
    return !!updated;
  }
}
