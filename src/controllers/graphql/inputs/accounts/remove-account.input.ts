import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereAccountInput {
  @Field()
  accountId: string;
}

@InputType()
export class RemoveAccountInput {
  @Field(() => RemoveWhereAccountInput)
  where: RemoveWhereAccountInput;
}
