import { Injectable, Scope } from '@nestjs/common';
import { FindAllFilesService } from '@/services/files/find-all-files';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class FilesLoader {
  constructor(private readonly filesService: FindAllFilesService) {}

  readonly findByIds = new DataLoader(async (fileIds: string[]) => {
    const files = await this.filesService.execute({
      where: {
        AND: {
          ids: fileIds
        }
      }
    });
    const filesMap = new Map(files?.items?.map((file) => [file.id, file]));
    return fileIds.map((fileId) => filesMap.get(fileId));
  });
}
