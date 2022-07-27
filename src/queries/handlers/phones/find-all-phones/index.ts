import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PhoneMapper } from '@/mappers/phones';
import { PhoneModel } from '@/models/phone.model';
import { FindAllPhonesQuery } from '@/queries/implements/phones/find-all-phones.query';
import { CountPhonesRepository } from '@/repositories/phones/count-phones';
import { FindAllPhonesRepository } from '@/repositories/phones/find-all-phones';

@QueryHandler(FindAllPhonesQuery)
export class FindAllPhonesQueryHandler
  implements IQueryHandler<FindAllPhonesQuery>
{
  constructor(
    private readonly findAllPhoneRepository: FindAllPhonesRepository,
    private readonly countPhonesRepository: CountPhonesRepository
  ) {}

  async execute(
    query: FindAllPhonesQuery
  ): Promise<IPaginatedType<PhoneModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new PhoneMapper().toFindAllQueryClean(query);
    const phones = await this.findAllPhoneRepository.execute(data);
    const totalCount = await this.countPhonesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PhoneModel>().toPaginationList({
      items: phones,
      page: data.page,
      totalCount
    });
  }
}
