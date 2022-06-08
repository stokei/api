import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereProductsTagInput {
  @Field()
  productsTagId: string;
}

@InputType()
export class RemoveProductsTagInput {
  @Field(() => RemoveWhereProductsTagInput)
  where: RemoveWhereProductsTagInput;
}
