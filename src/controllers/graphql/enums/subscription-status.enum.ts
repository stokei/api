import { registerEnumType } from '@nestjs/graphql';

import { SubscriptionStatus } from '@/enums/subscription-status.enum';

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus'
});

export { SubscriptionStatus };
