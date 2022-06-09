import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  AccessNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AccessModel } from '@/models/access.model';
import { FindAccessByIdQuery } from '@/queries/implements/accesses/find-access-by-id.query';
import { FindAccessByIdRepository } from '@/repositories/accesses/find-access-by-id';

@QueryHandler(FindAccessByIdQuery)
export class FindAccessByIdQueryHandler
  implements IQueryHandler<FindAccessByIdQuery>
{
  constructor(
    private readonly findAccessByIdRepository: FindAccessByIdRepository
  ) {}

  async execute(query: FindAccessByIdQuery): Promise<AccessModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const access = await this.findAccessByIdRepository.execute(id);
    if (!access) {
      throw new AccessNotFoundException();
    }
    return access;
  }
}
