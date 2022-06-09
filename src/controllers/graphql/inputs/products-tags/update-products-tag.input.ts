import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataProductsTagInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereProductsTagInput {
  @Field()
  productsTagId: string;
}

@InputType()
export class UpdateProductsTagInput {
  @Field(() => UpdateDataProductsTagInput)
  data: UpdateDataProductsTagInput;

  @Field(() => UpdateWhereProductsTagInput)
  where: UpdateWhereProductsTagInput;
}
