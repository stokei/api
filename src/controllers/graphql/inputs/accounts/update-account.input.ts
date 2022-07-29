import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAccountInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateAccountInput {
  @Field(() => UpdateDataAccountInput)
  data: UpdateDataAccountInput;
}
