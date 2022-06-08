import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataAccountInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereAccountInput {
  @Field()
  accountId: string;
}

@InputType()
export class UpdateAccountInput {
  @Field(() => UpdateDataAccountInput)
  data: UpdateDataAccountInput;

  @Field(() => UpdateWhereAccountInput)
  where: UpdateWhereAccountInput;
}
