import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereOrdersSellerInput {
  @Field()
  ordersSellerId: string;
}

@InputType()
export class RemoveOrdersSellerInput {
  @Field(() => RemoveWhereOrdersSellerInput)
  where: RemoveWhereOrdersSellerInput;
}
