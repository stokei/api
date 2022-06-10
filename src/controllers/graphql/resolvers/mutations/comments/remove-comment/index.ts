import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveCommentInput } from '@/controllers/graphql/inputs/comments/remove-comment.input';
import { Comment } from '@/controllers/graphql/types/comment';
import { RemoveCommentService } from '@/services/comments/remove-comment';

@Resolver(() => Comment)
export class RemoveCommentResolver {
  constructor(private readonly removeCommentService: RemoveCommentService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Comment)
  async removeComment(@Args('input') data: RemoveCommentInput) {
    const response = await this.removeCommentService.execute(data);
    return response;
  }
}
