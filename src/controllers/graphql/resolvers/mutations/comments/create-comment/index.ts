import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateCommentInput } from '@/controllers/graphql/inputs/comments/create-comment.input';
import { Comment } from '@/controllers/graphql/types/comment';
import { CreateCommentService } from '@/services/comments/create-comment';

@Resolver(() => Comment)
export class CreateCommentResolver {
  constructor(private readonly createCommentService: CreateCommentService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Comment)
  async createComment(
    @Args('input') data: CreateCommentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCommentService.execute(data);
    return response;
  }
}
