import { Field, InputType } from '@nestjs/graphql';

import { CreateDocumentInput } from '../documents/create-document.input';
import { CreatePhoneInput } from '../phones/create-phone.input';

@InputType()
export class CreateAccountPagarmeCustomerInput {
  @Field(() => String)
  dateBirthday: string;

  @Field(() => CreateDocumentInput)
  document: CreateDocumentInput;

  @Field(() => CreatePhoneInput)
  phone: CreatePhoneInput;
}
