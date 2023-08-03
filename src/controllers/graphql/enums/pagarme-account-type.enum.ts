import { registerEnumType } from '@nestjs/graphql';

import { PagarmeAccountType } from '@/enums/pagarme-account-type.enum';

registerEnumType(PagarmeAccountType, {
  name: 'PagarmeAccountType'
});

export { PagarmeAccountType };
