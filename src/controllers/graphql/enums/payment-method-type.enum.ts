import { registerEnumType } from '@nestjs/graphql';

import { PaymentMethodType } from '@/enums/payment-method-type.enum';

registerEnumType(PaymentMethodType, {
  name: 'PaymentMethodType'
});

export { PaymentMethodType };
