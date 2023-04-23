import { registerEnumType } from '@nestjs/graphql';

import { UsageRecordAction } from '@/enums/usage-record-action.enum';

registerEnumType(UsageRecordAction, {
  name: 'UsageRecordAction'
});

export { UsageRecordAction };
