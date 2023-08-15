import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataOrderItemInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateWhereOrderItemInput {
  @Field()
  orderItem: string;
}

@InputType()
export class UpdateOrderItemInput {
  @Field(() => UpdateDataOrderItemInput)
  data: UpdateDataOrderItemInput;

  @Field(() => UpdateWhereOrderItemInput)
  where: UpdateWhereOrderItemInput;
}
