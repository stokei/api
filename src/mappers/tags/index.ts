import { convertToISODateString } from '@stokei/nestjs';
import { TagEntity } from '@/entities';
import { TagModel } from '@/models/tag.model';

export class TagMapper {
  toModel(tag: TagEntity) {
    return (
      tag &&
      new TagModel({
        ...tag,
        updatedAt: convertToISODateString(tag.updatedAt),
        createdAt: convertToISODateString(tag.createdAt)
      })
    );
  }
  toModels(tags: TagEntity[]) {
    return tags?.length > 0 ? tags.map(this.toModel).filter(Boolean) : [];
  }
}
