import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereProductsImageInput {
  @Field()
  productsImageId: string;
}

@InputType()
export class RemoveProductsImageInput {
  @Field(() => RemoveWhereProductsImageInput)
  where: RemoveWhereProductsImageInput;
}
