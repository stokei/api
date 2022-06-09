import { Injectable } from '@nestjs/common';
import { convertToISODateString, IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveAccessDTO } from '@/dtos/accesses/remove-access.dto';

@Injectable()
export class RemoveAccessRepository
  implements IBaseRepository<RemoveAccessDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveAccessDTO): Promise<boolean> {
    const removed = await this.model.access.update({
      where: {
        id: where?.accessId
      },
      data: {
        active: false,
        expiresIn: convertToISODateString(Date.now()),
        canceledAt: convertToISODateString(Date.now())
      }
    });
    return !!removed;
  }
}
