import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataPaymentsMethodInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWherePaymentsMethodInput {
  @Field()
  paymentsMethodId: string;
}

@InputType()
export class UpdatePaymentsMethodInput {
  @Field(() => UpdateDataPaymentsMethodInput)
  data: UpdateDataPaymentsMethodInput;

  @Field(() => UpdateWherePaymentsMethodInput)
  where: UpdateWherePaymentsMethodInput;
}
