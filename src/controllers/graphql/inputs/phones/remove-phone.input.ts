import { InputType, Field } from '@nestjs/graphql';

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
