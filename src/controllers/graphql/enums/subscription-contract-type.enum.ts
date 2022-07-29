import { registerEnumType } from '@nestjs/graphql';

import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

registerEnumType(SubscriptionContractType, {
  name: 'SubscriptionContractType'
});

export { SubscriptionContractType };
