import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereOrderItemInput {
  @Field()
  orderItem: string;
}

@InputType()
export class RemoveOrderItemInput {
  @Field(() => RemoveWhereOrderItemInput)
  where: RemoveWhereOrderItemInput;
}
