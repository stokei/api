import { registerEnumType } from '@nestjs/graphql';

import { BillingScheme } from '@/enums/billing-scheme.enum';

registerEnumType(BillingScheme, {
  name: 'BillingScheme'
});

export { BillingScheme };
