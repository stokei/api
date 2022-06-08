import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereProductsCategoryInput {
  @Field()
  productsCategoryId: string;
}

@InputType()
export class RemoveProductsCategoryInput {
  @Field(() => RemoveWhereProductsCategoryInput)
  where: RemoveWhereProductsCategoryInput;
}
