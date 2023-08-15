import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
