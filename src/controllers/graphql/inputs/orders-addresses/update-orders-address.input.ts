import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataOrdersAddressInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereOrdersAddressInput {
  @Field()
  ordersAddressId: string;
}

@InputType()
export class UpdateOrdersAddressInput {
  @Field(() => UpdateDataOrdersAddressInput)
  data: UpdateDataOrdersAddressInput;

  @Field(() => UpdateWhereOrdersAddressInput)
  where: UpdateWhereOrdersAddressInput;
}
