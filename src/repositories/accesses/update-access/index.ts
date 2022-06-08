import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateAccessDTO } from '@/dtos/accesses/update-access.dto';

@Injectable()
export class UpdateAccessRepository
  implements IBaseRepository<UpdateAccessDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateAccessDTO): Promise<boolean> {
    const updated = await this.model.access.update({
      where: {
        id: where?.accessId
      },
      data
    });
    return !!updated;
  }
}
