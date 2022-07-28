import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAddressesDTO } from '@/dtos/addresses/find-all-addresses.dto';
import { AddressMapper } from '@/mappers/addresses';
import { AddressModel } from '@/models/address.model';

@Injectable()
export class FindAllAddressesRepository
  implements IBaseRepository<FindAllAddressesDTO, Promise<AddressModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAddressesDTO): Promise<AddressModel[]> {
    const addressMapper = new AddressMapper();
    return addressMapper.toModels(
      await this.model.address.findMany(addressMapper.toFindAllPrisma(data))
    );
  }
}
