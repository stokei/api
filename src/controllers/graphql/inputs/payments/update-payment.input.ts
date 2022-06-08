import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataPaymentInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWherePaymentInput {
  @Field()
  paymentId: string;
}

@InputType()
export class UpdatePaymentInput {
  @Field(() => UpdateDataPaymentInput)
  data: UpdateDataPaymentInput;

  @Field(() => UpdateWherePaymentInput)
  where: UpdateWherePaymentInput;
}
