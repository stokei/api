import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereAddressInput {
  @Field()
  addressId: string;
}

@InputType()
export class RemoveAddressInput {
  @Field(() => RemoveWhereAddressInput)
  where: RemoveWhereAddressInput;
}
