import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCartItemInput {
  @Field()
  cartItemId: string;
}

@InputType()
export class RemoveCartItemInput {
  @Field(() => RemoveWhereCartItemInput)
  where: RemoveWhereCartItemInput;
}
