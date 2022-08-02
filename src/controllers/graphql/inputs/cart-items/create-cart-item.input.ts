import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCartItemInput {
  @Field()
  parent: string;

  @Field()
  price: string;

  @Field()
  product: string;
}
