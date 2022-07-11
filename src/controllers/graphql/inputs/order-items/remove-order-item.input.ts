import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereOrderItemInput {
  @Field()
  orderItemId: string;
}

@InputType()
export class RemoveOrderItemInput {
  @Field(() => RemoveWhereOrderItemInput)
  where: RemoveWhereOrderItemInput;
}
