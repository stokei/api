import { registerEnumType } from '@nestjs/graphql';

import { ColorType } from '@/enums/color-type.enum';

registerEnumType(ColorType, {
  name: 'ColorType'
});

export { ColorType };
