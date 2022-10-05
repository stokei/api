import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { FileMapper } from '@/mappers/files';
import { FileModel } from '@/models/file.model';
import { FindAllFilesQuery } from '@/queries/implements/files/find-all-files.query';
import { CountFilesRepository } from '@/repositories/files/count-files';
import { FindAllFilesRepository } from '@/repositories/files/find-all-files';

@QueryHandler(FindAllFilesQuery)
export class FindAllFilesQueryHandler
  implements IQueryHandler<FindAllFilesQuery>
{
  constructor(
    private readonly findAllFileRepository: FindAllFilesRepository,
    private readonly countFilesRepository: CountFilesRepository
  ) {}

  async execute(query: FindAllFilesQuery): Promise<IPaginatedType<FileModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new FileMapper().toFindAllQueryClean(query);
    const files = await this.findAllFileRepository.execute(data);
    const totalCount = await this.countFilesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<FileModel>().toPaginationList({
      items: files,
      page: data.page,
      totalCount
    });
  }
}
