import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSortedItemInput {
  @Field(() => String)
  parent: string;

  @Field(() => String)
  item: string;
}
