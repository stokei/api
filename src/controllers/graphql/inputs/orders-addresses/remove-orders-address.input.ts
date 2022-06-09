import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereOrdersAddressInput {
  @Field()
  ordersAddressId: string;
}

@InputType()
export class RemoveOrdersAddressInput {
  @Field(() => RemoveWhereOrdersAddressInput)
  where: RemoveWhereOrdersAddressInput;
}
