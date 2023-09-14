import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, VersionNotFoundException } from '@/errors';
import { VersionModel } from '@/models/version.model';
import { FindVersionWithComponentsQuery } from '@/queries/implements/versions/find-version-with-components.query';
import { FindAllComponentsTreeService } from '@/services/components/find-all-components-tree';
import { FindVersionByIdService } from '@/services/versions/find-version-by-id';

@QueryHandler(FindVersionWithComponentsQuery)
export class FindVersionWithComponentsQueryHandler
  implements IQueryHandler<FindVersionWithComponentsQuery>
{
  constructor(
    private readonly findVersionByIdService: FindVersionByIdService,
    private readonly findAllComponentsTreeService: FindAllComponentsTreeService
  ) {}

  async execute(query: FindVersionWithComponentsQuery): Promise<VersionModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const versionId = cleanValue(query.versionId);
    if (!versionId) {
      throw new VersionNotFoundException();
    }
    const version = await this.findVersionByIdService.execute(versionId);
    if (!version) {
      throw new VersionNotFoundException();
    }

    const components = await this.findAllComponentsTreeService.execute({
      app: version.app,
      parent: version.id
    });

    return new VersionModel({
      ...version,
      components
    });
  }
}
