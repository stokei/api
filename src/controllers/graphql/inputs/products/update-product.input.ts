import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataProductInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereProductInput {
  @Field()
  productId: string;
}

@InputType()
export class UpdateProductInput {
  @Field(() => UpdateDataProductInput)
  data: UpdateDataProductInput;

  @Field(() => UpdateWhereProductInput)
  where: UpdateWhereProductInput;
}
