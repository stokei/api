import { Injectable, Scope } from '@nestjs/common';
import { FindAllTagsService } from '@/services/tags/find-all-tags';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class TagsLoader {
  constructor(private readonly tagsService: FindAllTagsService) {}

  readonly findByIds = new DataLoader(async (tagIds: string[]) => {
    const tags = await this.tagsService.execute({
      where: {
        AND: {
          ids: tagIds
        }
      }
    });
    const tagsMap = new Map(tags?.items?.map((tag) => [tag.id, tag]));
    return tagIds.map((tagId) => tagsMap.get(tagId));
  });
}
