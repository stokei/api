import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommentsLoader } from '@/controllers/graphql/dataloaders/comments.loader';
import { Comment } from '@/controllers/graphql/types/comment';
import { CommentNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentsLoader: CommentsLoader) {}

  @Query(() => Comment)
  async comment(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const comment = await this.commentsLoader.findByIds.load(id);
    if (!comment) {
      throw new CommentNotFoundException();
    }
    return comment;
  }
}
