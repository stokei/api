import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePaymentMethodInput {
  @Field()
  paymentMethod: string;
}

@InputType()
export class RemovePaymentMethodInput {
  @Field(() => RemoveWherePaymentMethodInput)
  where: RemoveWherePaymentMethodInput;
}
