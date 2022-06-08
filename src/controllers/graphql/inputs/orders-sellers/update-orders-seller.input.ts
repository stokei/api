import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataOrdersSellerInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereOrdersSellerInput {
  @Field()
  ordersSellerId: string;
}

@InputType()
export class UpdateOrdersSellerInput {
  @Field(() => UpdateDataOrdersSellerInput)
  data: UpdateDataOrdersSellerInput;

  @Field(() => UpdateWhereOrdersSellerInput)
  where: UpdateWhereOrdersSellerInput;
}
