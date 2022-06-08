import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { AddressMapper } from '@/mappers/addresses';
import { AddressModel } from '@/models/address.model';

@Injectable()
export class FindAddressByIdRepository
  implements IBaseRepository<string, Promise<AddressModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<AddressModel> {
    return new AddressMapper().toModel(
      await this.model.address.findUnique({
        where: { id }
      })
    );
  }
}
