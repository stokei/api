import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { VersionModel } from '@/models/version.model';
import { FindVersionWithComponentsQuery } from '@/queries/implements/versions/find-version-with-components.query';

@Injectable()
export class FindVersionWithComponentsService
  implements IBaseService<string, Promise<VersionModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VersionModel> {
    return await this.queryBus.execute(
      new FindVersionWithComponentsQuery(data)
    );
  }
}
