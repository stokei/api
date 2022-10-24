import { registerEnumType } from '@nestjs/graphql';

import { PlanType } from '@/enums/plan-type.enum';

registerEnumType(PlanType, {
  name: 'PlanType'
});

export { PlanType };
