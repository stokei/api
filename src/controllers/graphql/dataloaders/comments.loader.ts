import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCommentsService } from '@/services/comments/find-all-comments';

@Injectable({ scope: Scope.REQUEST })
export class CommentsLoader {
  constructor(private readonly commentsService: FindAllCommentsService) {}

  readonly findByIds = new DataLoader(async (commentIds: string[]) => {
    const comments = await this.commentsService.execute({
      where: {
        AND: {
          ids: commentIds
        }
      }
    });
    const commentsMap = new Map(
      comments?.items?.map((comment) => [comment.id, comment])
    );
    return commentIds.map((commentId) => commentsMap.get(commentId));
  });
}
