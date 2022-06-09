import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductsImageInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
