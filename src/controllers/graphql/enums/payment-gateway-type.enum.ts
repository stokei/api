import { registerEnumType } from '@nestjs/graphql';

import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';

registerEnumType(PaymentGatewayType, {
  name: 'PaymentGatewayType'
});

export { PaymentGatewayType };
