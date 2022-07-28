import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAddressesDTO } from '@/dtos/addresses/count-addresses.dto';
import { AddressMapper } from '@/mappers/addresses';

@Injectable()
export class CountAddressesRepository
  implements IBaseRepository<CountAddressesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAddressesDTO): Promise<number> {
    const addressMapper = new AddressMapper();
    return await this.model.address.count({
      where: addressMapper.toWhereFindAllPrisma(where)
    });
  }
}
