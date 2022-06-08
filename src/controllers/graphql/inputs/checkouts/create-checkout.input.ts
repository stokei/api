import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
