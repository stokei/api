import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCommentInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCommentInput {
  @Field()
  commentId: string;
}

@InputType()
export class UpdateCommentInput {
  @Field(() => UpdateDataCommentInput)
  data: UpdateDataCommentInput;

  @Field(() => UpdateWhereCommentInput)
  where: UpdateWhereCommentInput;
}
