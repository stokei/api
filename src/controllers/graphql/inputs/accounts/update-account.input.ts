import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAccountInput {
  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String, { nullable: true })
  dateBirthday?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}

@InputType()
export class UpdateAccountInput {
  @Field(() => UpdateDataAccountInput)
  data: UpdateDataAccountInput;
}
