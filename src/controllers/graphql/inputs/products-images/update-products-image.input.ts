import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataProductsImageInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereProductsImageInput {
  @Field()
  productsImageId: string;
}

@InputType()
export class UpdateProductsImageInput {
  @Field(() => UpdateDataProductsImageInput)
  data: UpdateDataProductsImageInput;

  @Field(() => UpdateWhereProductsImageInput)
  where: UpdateWhereProductsImageInput;
}
