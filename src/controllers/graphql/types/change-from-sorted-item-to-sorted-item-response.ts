import { Field, ObjectType } from '@nestjs/graphql';

import { SortedItem } from './sorted-item';

@ObjectType()
export class ChangeFromSortedItemToSortedItemResponse {
  @Field(() => SortedItem, { nullable: true })
  fromItem: SortedItem;

  @Field(() => SortedItem, { nullable: true })
  toItem: SortedItem;
}
