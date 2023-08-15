import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataPaymentInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateWherePaymentInput {
  @Field()
  payment: string;
}

@InputType()
export class UpdatePaymentInput {
  @Field(() => UpdateDataPaymentInput)
  data: UpdateDataPaymentInput;

  @Field(() => UpdateWherePaymentInput)
  where: UpdateWherePaymentInput;
}
