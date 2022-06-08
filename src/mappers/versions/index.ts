import { convertToISODateString } from '@stokei/nestjs';
import { VersionEntity } from '@/entities';
import { VersionModel } from '@/models/version.model';

export class VersionMapper {
  toModel(version: VersionEntity) {
    return (
      version &&
      new VersionModel({
        ...version,
        updatedAt: convertToISODateString(version.updatedAt),
        createdAt: convertToISODateString(version.createdAt)
      })
    );
  }
  toModels(versions: VersionEntity[]) {
    return versions?.length > 0
      ? versions.map(this.toModel).filter(Boolean)
      : [];
  }
}
