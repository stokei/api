import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePaymentInput {
  @Field()
  paymentId: string;
}

@InputType()
export class RemovePaymentInput {
  @Field(() => RemoveWherePaymentInput)
  where: RemoveWherePaymentInput;
}
