import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  DomainNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { DomainModel } from '@/models/domain.model';
import { FindDomainByIdRepository } from '@/repositories/domains/find-domain-by-id';
import { FindDomainByIdQuery } from '@/queries/implements/domains/find-domain-by-id.query';

@QueryHandler(FindDomainByIdQuery)
export class FindDomainByIdQueryHandler
  implements IQueryHandler<FindDomainByIdQuery>
{
  constructor(
    private readonly findDomainByIdRepository: FindDomainByIdRepository
  ) {}

  async execute(query: FindDomainByIdQuery): Promise<DomainModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const domain = await this.findDomainByIdRepository.execute(id);
    if (!domain) {
      throw new DomainNotFoundException();
    }
    return domain;
  }
}
