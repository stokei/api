import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWherePaymentsMethodInput {
  @Field()
  paymentsMethodId: string;
}

@InputType()
export class RemovePaymentsMethodInput {
  @Field(() => RemoveWherePaymentsMethodInput)
  where: RemoveWherePaymentsMethodInput;
}
