import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductsTagInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
