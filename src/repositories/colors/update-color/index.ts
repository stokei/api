import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateColorDTO } from '@/dtos/colors/update-color.dto';

@Injectable()
export class UpdateColorRepository
  implements IBaseRepository<UpdateColorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateColorDTO): Promise<boolean> {
    const updated = await this.model.color.update({
      where: {
        id: where?.colorId
      },
      data
    });
    return !!updated;
  }
}
