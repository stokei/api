import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePaymentInput {
  @Field()
  payment: string;
}

@InputType()
export class RemovePaymentInput {
  @Field(() => RemoveWherePaymentInput)
  where: RemoveWherePaymentInput;
}
