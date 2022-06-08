import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereOrdersItemInput {
  @Field()
  ordersItemId: string;
}

@InputType()
export class RemoveOrdersItemInput {
  @Field(() => RemoveWhereOrdersItemInput)
  where: RemoveWhereOrdersItemInput;
}
