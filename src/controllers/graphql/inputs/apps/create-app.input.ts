import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  currency: string;

  @Field()
  language: string;

  @Field()
  paymentMethod: string;
}
