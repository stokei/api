import { Field, InputType } from '@nestjs/graphql';

import { PagarmeAccountType } from '@/controllers/graphql/enums/pagarme-account-type.enum';

import { CreateAppPagarmeDefaultBankAccountInput } from './create-app-pagarme-default-bank-account.input';

@InputType()
export class CreateAppPagarmeAccountInput {
  @Field(() => PagarmeAccountType)
  type: PagarmeAccountType;

  @Field(() => String)
  document: string;

  @Field(() => CreateAppPagarmeDefaultBankAccountInput)
  defaultBankAccount: CreateAppPagarmeDefaultBankAccountInput;
}
