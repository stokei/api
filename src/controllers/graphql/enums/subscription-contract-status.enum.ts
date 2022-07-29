import { registerEnumType } from '@nestjs/graphql';

import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

registerEnumType(SubscriptionContractStatus, {
  name: 'SubscriptionContractStatus'
});

export { SubscriptionContractStatus };
