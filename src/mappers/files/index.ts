import { convertToISODateString } from '@stokei/nestjs';
import { FileEntity } from '@/entities';
import { FileModel } from '@/models/file.model';

export class FileMapper {
  toModel(file: FileEntity) {
    return (
      file &&
      new FileModel({
        ...file,
        updatedAt: convertToISODateString(file.updatedAt),
        createdAt: convertToISODateString(file.createdAt)
      })
    );
  }
  toModels(files: FileEntity[]) {
    return files?.length > 0 ? files.map(this.toModel).filter(Boolean) : [];
  }
}
