import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
