import { registerEnumType } from '@nestjs/graphql';
import { AccountRole } from '@/enums/account-role.enum';

registerEnumType(AccountRole, {
  name: 'AccountRole'
});

export { AccountRole };
