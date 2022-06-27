import { registerEnumType } from '@nestjs/graphql';

import { PaymentStatus } from '@/enums/payment-status.enum';

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus'
});

export { PaymentStatus };
