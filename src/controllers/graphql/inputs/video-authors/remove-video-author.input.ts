import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVideoAuthorInput {
  @Field()
  video: string;

  @Field()
  author: string;
}

@InputType()
export class RemoveVideoAuthorInput {
  @Field(() => RemoveWhereVideoAuthorInput)
  where: RemoveWhereVideoAuthorInput;
}
