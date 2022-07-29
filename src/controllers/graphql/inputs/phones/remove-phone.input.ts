import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePhoneInput {
  @Field()
  phone: string;
}

@InputType()
export class RemovePhoneInput {
  @Field(() => RemoveWherePhoneInput)
  where: RemoveWherePhoneInput;
}
