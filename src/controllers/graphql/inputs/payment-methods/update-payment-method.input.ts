import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataPaymentMethodInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWherePaymentMethodInput {
  @Field()
  paymentMethodId: string;
}

@InputType()
export class UpdatePaymentMethodInput {
  @Field(() => UpdateDataPaymentMethodInput)
  data: UpdateDataPaymentMethodInput;

  @Field(() => UpdateWherePaymentMethodInput)
  where: UpdateWherePaymentMethodInput;
}
