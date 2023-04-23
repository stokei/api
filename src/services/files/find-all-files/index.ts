import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllFilesDTO } from '@/dtos/files/find-all-files.dto';
import { FileModel } from '@/models/file.model';
import { FindAllFilesQuery } from '@/queries/implements/files/find-all-files.query';

@Injectable()
export class FindAllFilesService
  implements IBaseService<FindAllFilesDTO, Promise<IPaginatedType<FileModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllFilesDTO): Promise<IPaginatedType<FileModel>> {
    return await this.queryBus.execute(new FindAllFilesQuery(data));
  }
}
