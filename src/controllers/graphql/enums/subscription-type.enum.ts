import { registerEnumType } from '@nestjs/graphql';

import { SubscriptionType } from '@/enums/subscription-type.enum';

registerEnumType(SubscriptionType, {
  name: 'SubscriptionType'
});

export { SubscriptionType };
