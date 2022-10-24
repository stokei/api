import { registerEnumType } from '@nestjs/graphql';

import { IntervalType } from '@/enums/interval-type.enum';

registerEnumType(IntervalType, {
  name: 'IntervalType'
});

export { IntervalType };
