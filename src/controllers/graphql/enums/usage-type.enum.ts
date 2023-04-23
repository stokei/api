import { registerEnumType } from '@nestjs/graphql';

import { UsageType } from '@/enums/usage-type.enum';

registerEnumType(UsageType, {
  name: 'UsageType'
});

export { UsageType };
