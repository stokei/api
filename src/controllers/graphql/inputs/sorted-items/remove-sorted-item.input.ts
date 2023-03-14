import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereSortedItemInput {
  @Field(() => String)
  sortedItem: string;
}

@InputType()
export class RemoveSortedItemInput {
  @Field(() => RemoveWhereSortedItemInput)
  where: RemoveWhereSortedItemInput;
}
