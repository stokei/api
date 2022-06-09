import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllAddressesDTO } from '@/dtos/addresses/find-all-addresses.dto';
import { AddressModel } from '@/models/address.model';
import { FindAllAddressesQuery } from '@/queries/implements/addresses/find-all-addresses.query';

@Injectable()
export class FindAllAddressesService
  implements
    IBaseService<FindAllAddressesDTO, Promise<IPaginatedType<AddressModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllAddressesDTO
  ): Promise<IPaginatedType<AddressModel>> {
    return await this.queryBus.execute(new FindAllAddressesQuery(data));
  }
}
