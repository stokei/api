import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateCommentInput } from '@/controllers/graphql/inputs/comments/update-comment.input';
import { Comment } from '@/controllers/graphql/types/comment';
import { UpdateCommentService } from '@/services/comments/update-comment';

@Resolver(() => Comment)
export class UpdateCommentResolver {
  constructor(private readonly updateCommentService: UpdateCommentService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Comment)
  async updateComment(@Args('input') data: UpdateCommentInput) {
    const response = await this.updateCommentService.execute(data);
    return response;
  }
}
