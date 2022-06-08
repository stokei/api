import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataCartInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCartInput {
  @Field()
  cartId: string;
}

@InputType()
export class UpdateCartInput {
  @Field(() => UpdateDataCartInput)
  data: UpdateDataCartInput;

  @Field(() => UpdateWhereCartInput)
  where: UpdateWhereCartInput;
}
