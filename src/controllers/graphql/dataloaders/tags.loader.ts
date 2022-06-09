import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllTagsService } from '@/services/tags/find-all-tags';

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
