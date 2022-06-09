import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCommentInput } from '@/controllers/graphql/inputs/comments/remove-comment.input';
import { Comment } from '@/controllers/graphql/types/comment';
import { RemoveCommentService } from '@/services/comments/remove-comment';

@Resolver(() => Comment)
export class RemoveCommentResolver {
  constructor(private readonly removeCommentService: RemoveCommentService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Comment)
  async removeComment(
    @Args('input') data: RemoveCommentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCommentService.execute(data);
    return response;
  }
}
