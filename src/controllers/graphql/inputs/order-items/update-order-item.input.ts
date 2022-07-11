import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataOrderItemInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereOrderItemInput {
  @Field()
  orderItemId: string;
}

@InputType()
export class UpdateOrderItemInput {
  @Field(() => UpdateDataOrderItemInput)
  data: UpdateDataOrderItemInput;

  @Field(() => UpdateWhereOrderItemInput)
  where: UpdateWhereOrderItemInput;
}
