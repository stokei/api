import { registerEnumType } from '@nestjs/graphql';

import { PagarmeBankAccountType } from '@/enums/pagarme-bank-account-type.enum';

registerEnumType(PagarmeBankAccountType, {
  name: 'PagarmeBankAccountType'
});

export { PagarmeBankAccountType };
