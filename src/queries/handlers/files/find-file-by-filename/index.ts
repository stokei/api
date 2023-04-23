import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  FileNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FileModel } from '@/models/file.model';
import { FindFileByFilenameQuery } from '@/queries/implements/files/find-file-by-filename.query';
import { FindFileByFilenameRepository } from '@/repositories/files/find-file-by-filename';

@QueryHandler(FindFileByFilenameQuery)
export class FindFileByFilenameQueryHandler
  implements IQueryHandler<FindFileByFilenameQuery>
{
  constructor(
    private readonly findFileByFilenameRepository: FindFileByFilenameRepository
  ) {}

  async execute(query: FindFileByFilenameQuery): Promise<FileModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const filename = cleanValue(query.filename);
    if (!filename) {
      throw new ParamNotFoundException('filename');
    }

    const file = await this.findFileByFilenameRepository.execute(filename);
    if (!file) {
      throw new FileNotFoundException();
    }
    return file;
  }
}
