import { Field, InputType } from '@nestjs/graphql';

import { PagarmeAccountType } from '@/controllers/graphql/enums/pagarme-account-type.enum';

@InputType()
export class CreateAppPagarmeDefaultBankAccountInput {
  @Field(() => PagarmeAccountType)
  holderType: PagarmeAccountType;

  @Field(() => String)
  holderDocument: string;

  @Field(() => String)
  accountNumber: string;

  @Field(() => String)
  accountCheckDigit: string;

  @Field(() => String)
  branchCheckDigit: string;

  @Field(() => String)
  branchNumber: string;

  @Field(() => String)
  bank: string;

  @Field(() => String)
  holderName: string;
}
