import { ICommand } from '@nestjs/cqrs';

import { RemoveStorageFileDTO } from '@/dtos/files/remove-storage-file.dto';
import { FileModel } from '@/models/file.model';

export class RemoveStorageFileCommand
  implements ICommand, RemoveStorageFileDTO
{
  file: FileModel;
  constructor(data: RemoveStorageFileDTO) {
    this.file = data.file;
  }
}
