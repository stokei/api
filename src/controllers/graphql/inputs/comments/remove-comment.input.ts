import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCommentInput {
  @Field()
  commentId: string;
}

@InputType()
export class RemoveCommentInput {
  @Field(() => RemoveWhereCommentInput)
  where: RemoveWhereCommentInput;
}
