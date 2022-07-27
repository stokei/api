import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { AddressMapper } from '@/mappers/addresses';
import { AddressModel } from '@/models/address.model';
import { FindAllAddressesQuery } from '@/queries/implements/addresses/find-all-addresses.query';
import { CountAddressesRepository } from '@/repositories/addresses/count-addresses';
import { FindAllAddressesRepository } from '@/repositories/addresses/find-all-addresses';

@QueryHandler(FindAllAddressesQuery)
export class FindAllAddressesQueryHandler
  implements IQueryHandler<FindAllAddressesQuery>
{
  constructor(
    private readonly findAllAddressRepository: FindAllAddressesRepository,
    private readonly countAddressesRepository: CountAddressesRepository
  ) {}

  async execute(
    query: FindAllAddressesQuery
  ): Promise<IPaginatedType<AddressModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new AddressMapper().toFindAllQueryClean(query);
    const addresses = await this.findAllAddressRepository.execute(data);
    const totalCount = await this.countAddressesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AddressModel>().toPaginationList({
      items: addresses,
      page: data.page,
      totalCount
    });
  }
}
