import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  FileNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FileModel } from '@/models/file.model';
import { FindFileByIdRepository } from '@/repositories/files/find-file-by-id';
import { FindFileByIdQuery } from '@/queries/implements/files/find-file-by-id.query';

@QueryHandler(FindFileByIdQuery)
export class FindFileByIdQueryHandler
  implements IQueryHandler<FindFileByIdQuery>
{
  constructor(
    private readonly findFileByIdRepository: FindFileByIdRepository
  ) {}

  async execute(query: FindFileByIdQuery): Promise<FileModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const file = await this.findFileByIdRepository.execute(id);
    if (!file) {
      throw new FileNotFoundException();
    }
    return file;
  }
}
