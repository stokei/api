import { registerEnumType } from '@nestjs/graphql';

import { PhoneStatus } from '@/enums/phone-status.enum';

registerEnumType(PhoneStatus, {
  name: 'PhoneStatus'
});

export { PhoneStatus };
