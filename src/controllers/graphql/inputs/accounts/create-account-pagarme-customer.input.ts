import { Field, InputType } from '@nestjs/graphql';

import { CreatePhoneInput } from '../phones/create-phone.input';

@InputType()
export class CreateAccountPagarmeCustomerInput {
  @Field(() => String)
  dateBirthday: string;

  @Field(() => String)
  cpf: string;

  @Field(() => CreatePhoneInput)
  phone: CreatePhoneInput;
}
