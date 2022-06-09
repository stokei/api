import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductsTagInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
