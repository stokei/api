import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
