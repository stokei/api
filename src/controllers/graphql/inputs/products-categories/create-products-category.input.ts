import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductsCategoryInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
