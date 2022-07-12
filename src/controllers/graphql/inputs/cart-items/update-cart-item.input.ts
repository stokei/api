import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCartItemInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCartItemInput {
  @Field()
  cartItemId: string;
}

@InputType()
export class UpdateCartItemInput {
  @Field(() => UpdateDataCartItemInput)
  data: UpdateDataCartItemInput;

  @Field(() => UpdateWhereCartItemInput)
  where: UpdateWhereCartItemInput;
}
