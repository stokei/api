import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataPhoneInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWherePhoneInput {
  @Field()
  phoneId: string;
}

@InputType()
export class UpdatePhoneInput {
  @Field(() => UpdateDataPhoneInput)
  data: UpdateDataPhoneInput;

  @Field(() => UpdateWherePhoneInput)
  where: UpdateWherePhoneInput;
}
