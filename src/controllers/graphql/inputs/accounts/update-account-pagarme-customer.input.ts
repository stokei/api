import { Field, InputType } from '@nestjs/graphql';

import { CreateDocumentInput } from '../documents/create-document.input';
import { CreatePhoneInput } from '../phones/create-phone.input';

@InputType()
export class UpdateAccountPagarmeCustomerInput {
  @Field(() => String, { nullable: true })
  dateBirthday?: string;

  @Field(() => CreateDocumentInput, { nullable: true })
  document?: CreateDocumentInput;

  @Field(() => CreatePhoneInput, { nullable: true })
  phone?: CreatePhoneInput;
}
