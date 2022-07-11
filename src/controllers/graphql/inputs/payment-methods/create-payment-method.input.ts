import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentMethodInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
