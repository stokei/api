import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field()
  parent: string;

  @Field()
  street: string;

  @Field({ nullable: true })
  complement?: string;

  @Field()
  number: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  state: string;

  @Field()
  postalCode: string;
}
