import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { DomainModel } from '@/models/domain.model';
import { FindDomainByNameQuery } from '@/queries/implements/domains/find-domain-by-name.query';
import { FindDomainByNameRepository } from '@/repositories/domains/find-domain-by-name';

@QueryHandler(FindDomainByNameQuery)
export class FindDomainByNameQueryHandler
  implements IQueryHandler<FindDomainByNameQuery>
{
  constructor(
    private readonly findDomainByNameRepository: FindDomainByNameRepository
  ) {}

  async execute(query: FindDomainByNameQuery): Promise<DomainModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const name = cleanValue(query.name);
    if (!name) {
      throw new ParamNotFoundException('name');
    }

    const domain = await this.findDomainByNameRepository.execute(name);
    if (!domain) {
      throw new DomainNotFoundException();
    }
    return domain;
  }
}
