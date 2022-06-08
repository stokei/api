import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataOrdersItemInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereOrdersItemInput {
  @Field()
  ordersItemId: string;
}

@InputType()
export class UpdateOrdersItemInput {
  @Field(() => UpdateDataOrdersItemInput)
  data: UpdateDataOrdersItemInput;

  @Field(() => UpdateWhereOrdersItemInput)
  where: UpdateWhereOrdersItemInput;
}
