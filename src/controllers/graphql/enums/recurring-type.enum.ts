import { registerEnumType } from '@nestjs/graphql';

import { RecurringType } from '@/enums/recurring-type.enum';

registerEnumType(RecurringType, {
  name: 'RecurringType'
});

export { RecurringType };
