import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCartInput {
  @Field()
  cart: string;
}

@InputType()
export class RemoveCartInput {
  @Field(() => RemoveWhereCartInput)
  where: RemoveWhereCartInput;
}
