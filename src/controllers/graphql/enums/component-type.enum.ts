import { registerEnumType } from '@nestjs/graphql';

import { ComponentType } from '@/enums/component-type.enum';

registerEnumType(ComponentType, {
  name: 'ComponentType'
});

export { ComponentType };
