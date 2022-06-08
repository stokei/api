import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { AddressModel } from '@/models/address.model';
import { FindAddressByIdQuery } from '@/queries/implements/addresses/find-address-by-id.query';

@Injectable()
export class FindAddressByIdService
  implements IBaseService<string, Promise<AddressModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AddressModel> {
    return await this.queryBus.execute(new FindAddressByIdQuery(data));
  }
}
