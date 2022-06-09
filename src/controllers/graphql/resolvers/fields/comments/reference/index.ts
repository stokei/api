import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CommentsLoader } from '@/controllers/graphql/dataloaders/comments.loader';
import { Comment } from '@/controllers/graphql/types/comment';

@Resolver(() => Comment)
export class CommentReferenceResolver {
  constructor(private readonly commentsLoader: CommentsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.commentsLoader.findByIds.load(reference.id);
  }
}
