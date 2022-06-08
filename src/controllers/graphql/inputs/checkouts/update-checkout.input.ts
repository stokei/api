import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataCheckoutInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCheckoutInput {
  @Field()
  checkoutId: string;
}

@InputType()
export class UpdateCheckoutInput {
  @Field(() => UpdateDataCheckoutInput)
  data: UpdateDataCheckoutInput;

  @Field(() => UpdateWhereCheckoutInput)
  where: UpdateWhereCheckoutInput;
}
