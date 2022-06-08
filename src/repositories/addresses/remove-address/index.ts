import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveAddressDTO } from '@/dtos/addresses/remove-address.dto';

@Injectable()
export class RemoveAddressRepository
  implements IBaseRepository<RemoveAddressDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveAddressDTO): Promise<boolean> {
    const removed = await this.model.address.delete({
      where: {
        id: where?.addressId
      }
    });
    return !!removed;
  }
}
