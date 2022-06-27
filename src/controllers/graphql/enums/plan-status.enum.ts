import { registerEnumType } from '@nestjs/graphql';

import { PlanStatus } from '@/enums/plan-status.enum';

registerEnumType(PlanStatus, {
  name: 'PlanStatus'
});

export { PlanStatus };
