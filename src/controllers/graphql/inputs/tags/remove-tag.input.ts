import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereTagInput {
  @Field()
  tagId: string;
}

@InputType()
export class RemoveTagInput {
  @Field(() => RemoveWhereTagInput)
  where: RemoveWhereTagInput;
}
