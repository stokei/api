import { registerEnumType } from '@nestjs/graphql';

import { PaymentsMethodType } from '@/enums/payments-method-type.enum';

registerEnumType(PaymentsMethodType, {
  name: 'PaymentsMethodType'
});

export { PaymentsMethodType };
