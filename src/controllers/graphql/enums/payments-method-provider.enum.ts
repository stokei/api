import { registerEnumType } from '@nestjs/graphql';

import { PaymentsMethodProvider } from '@/enums/payments-method-provider.enum';

registerEnumType(PaymentsMethodProvider, {
  name: 'PaymentsMethodProvider'
});

export { PaymentsMethodProvider };
