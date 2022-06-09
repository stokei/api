import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePhoneInput {
  @Field()
  phoneId: string;
}

@InputType()
export class RemovePhoneInput {
  @Field(() => RemoveWherePhoneInput)
  where: RemoveWherePhoneInput;
}
