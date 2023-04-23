import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FileModel } from '@/models/file.model';
import { FindFileByFilenameQuery } from '@/queries/implements/files/find-file-by-filename.query';

@Injectable()
export class FindFileByFilenameService
  implements IBaseService<string, Promise<FileModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<FileModel> {
    return await this.queryBus.execute(new FindFileByFilenameQuery(data));
  }
}
