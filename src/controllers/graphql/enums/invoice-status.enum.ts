import { registerEnumType } from '@nestjs/graphql';

import { InvoiceStatus } from '@/enums/invoice-status.enum';

registerEnumType(InvoiceStatus, {
  name: 'InvoiceStatus'
});

export { InvoiceStatus };
