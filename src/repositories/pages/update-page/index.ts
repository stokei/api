import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePageDTO } from '@/dtos/pages/update-page.dto';

@Injectable()
export class UpdatePageRepository
  implements IBaseRepository<UpdatePageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePageDTO): Promise<boolean> {
    const updated = await this.model.page.update({
      where: {
        id: where?.page
      },
      data
    });
    return !!updated;
  }
}
