import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
