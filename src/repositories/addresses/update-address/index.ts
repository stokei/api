import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateAddressDTO } from '@/dtos/addresses/update-address.dto';

@Injectable()
export class UpdateAddressRepository
  implements IBaseRepository<UpdateAddressDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateAddressDTO): Promise<boolean> {
    const updated = await this.model.address.update({
      where: {
        id: where?.address
      },
      data
    });
    return !!updated;
  }
}
