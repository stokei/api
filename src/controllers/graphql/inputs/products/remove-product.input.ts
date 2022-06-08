import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereProductInput {
  @Field()
  productId: string;
}

@InputType()
export class RemoveProductInput {
  @Field(() => RemoveWhereProductInput)
  where: RemoveWhereProductInput;
}
