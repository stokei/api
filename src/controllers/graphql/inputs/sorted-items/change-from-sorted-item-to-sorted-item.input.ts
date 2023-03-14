import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangeFromSortedItemToSortedItemInput {
  @Field(() => String)
  fromItem: string;

  @Field(() => String)
  toItem: string;
}
