import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataProductsCategoryInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereProductsCategoryInput {
  @Field()
  productsCategoryId: string;
}

@InputType()
export class UpdateProductsCategoryInput {
  @Field(() => UpdateDataProductsCategoryInput)
  data: UpdateDataProductsCategoryInput;

  @Field(() => UpdateWhereProductsCategoryInput)
  where: UpdateWhereProductsCategoryInput;
}
