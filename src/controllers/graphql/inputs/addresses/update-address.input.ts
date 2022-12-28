import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAddressInput {
  @Field({ nullable: true })
  parent?: string;

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  complement?: string;

  @Field({ nullable: true })
  number?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  postalCode?: string;
}

@InputType()
export class UpdateWhereAddressInput {
  @Field()
  address: string;
}

@InputType()
export class UpdateAddressInput {
  @Field(() => UpdateDataAddressInput)
  data: UpdateDataAddressInput;

  @Field(() => UpdateWhereAddressInput)
  where: UpdateWhereAddressInput;
}
