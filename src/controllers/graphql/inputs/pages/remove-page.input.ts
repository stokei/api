import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePageInput {
  @Field()
  pageId: string;
}

@InputType()
export class RemovePageInput {
  @Field(() => RemoveWherePageInput)
  where: RemoveWherePageInput;
}
