import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  VersionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { VersionModel } from '@/models/version.model';
import { FindVersionByIdRepository } from '@/repositories/versions/find-version-by-id';
import { FindVersionByIdQuery } from '@/queries/implements/versions/find-version-by-id.query';

@QueryHandler(FindVersionByIdQuery)
export class FindVersionByIdQueryHandler
  implements IQueryHandler<FindVersionByIdQuery>
{
  constructor(
    private readonly findVersionByIdRepository: FindVersionByIdRepository
  ) {}

  async execute(query: FindVersionByIdQuery): Promise<VersionModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const version = await this.findVersionByIdRepository.execute(id);
    if (!version) {
      throw new VersionNotFoundException();
    }
    return version;
  }
}
