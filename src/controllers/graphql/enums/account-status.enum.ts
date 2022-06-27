import { registerEnumType } from '@nestjs/graphql';

import { AccountStatus } from '@/enums/account-status.enum';

registerEnumType(AccountStatus, {
  name: 'AccountStatus'
});

export { AccountStatus };
