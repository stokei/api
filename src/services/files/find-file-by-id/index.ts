import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FileModel } from '@/models/file.model';
import { FindFileByIdQuery } from '@/queries/implements/files/find-file-by-id.query';

@Injectable()
export class FindFileByIdService
  implements IBaseService<string, Promise<FileModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<FileModel> {
    return await this.queryBus.execute(new FindFileByIdQuery(data));
  }
}
