import { registerEnumType } from '@nestjs/graphql';

import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';

registerEnumType(PaymentMethodProvider, {
  name: 'PaymentMethodProvider'
});

export { PaymentMethodProvider };
