import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  AddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AddressModel } from '@/models/address.model';
import { FindAddressByIdRepository } from '@/repositories/addresses/find-address-by-id';
import { FindAddressByIdQuery } from '@/queries/implements/addresses/find-address-by-id.query';

@QueryHandler(FindAddressByIdQuery)
export class FindAddressByIdQueryHandler
  implements IQueryHandler<FindAddressByIdQuery>
{
  constructor(
    private readonly findAddressByIdRepository: FindAddressByIdRepository
  ) {}

  async execute(query: FindAddressByIdQuery): Promise<AddressModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const address = await this.findAddressByIdRepository.execute(id);
    if (!address) {
      throw new AddressNotFoundException();
    }
    return address;
  }
}
