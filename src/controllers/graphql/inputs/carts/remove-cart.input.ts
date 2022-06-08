import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCartInput {
  @Field()
  cartId: string;
}

@InputType()
export class RemoveCartInput {
  @Field(() => RemoveWhereCartInput)
  where: RemoveWhereCartInput;
}
