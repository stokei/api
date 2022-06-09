import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { VersionModel } from '@/models/version.model';
import { FindVersionByIdQuery } from '@/queries/implements/versions/find-version-by-id.query';

@Injectable()
export class FindVersionByIdService
  implements IBaseService<string, Promise<VersionModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VersionModel> {
    return await this.queryBus.execute(new FindVersionByIdQuery(data));
  }
}
