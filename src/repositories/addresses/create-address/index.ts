import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { AddressMapper } from '@/mappers/addresses';
import { CreateAddressDTO } from '@/dtos/addresses/create-address.dto';
import { AddressModel } from '@/models/address.model';

@Injectable()
export class CreateAddressRepository
  implements IBaseRepository<CreateAddressDTO, Promise<AddressModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAddressDTO): Promise<AddressModel> {
    return new AddressMapper().toModel(
      await this.model.address.create({ data })
    );
  }
}
