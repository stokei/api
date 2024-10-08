import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemovePhoneDTO } from '@/dtos/phones/remove-phone.dto';

@Injectable()
export class RemovePhoneRepository
  implements IBaseRepository<RemovePhoneDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePhoneDTO): Promise<boolean> {
    const removed = await this.model.phone.delete({
      where: {
        id: where?.phone
      }
    });
    return !!removed;
  }
}
