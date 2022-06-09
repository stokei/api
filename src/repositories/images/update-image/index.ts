import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateImageDTO } from '@/dtos/images/update-image.dto';

@Injectable()
export class UpdateImageRepository
  implements IBaseRepository<UpdateImageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateImageDTO): Promise<boolean> {
    const updated = await this.model.image.update({
      where: {
        id: where?.imageId
      },
      data
    });
    return !!updated;
  }
}
