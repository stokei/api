import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePriceInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
