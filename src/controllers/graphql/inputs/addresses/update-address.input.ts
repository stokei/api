import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAddressInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereAddressInput {
  @Field()
  addressId: string;
}

@InputType()
export class UpdateAddressInput {
  @Field(() => UpdateDataAddressInput)
  data: UpdateDataAddressInput;

  @Field(() => UpdateWhereAddressInput)
  where: UpdateWhereAddressInput;
}
