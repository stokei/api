import { registerEnumType } from '@nestjs/graphql';

import { PriceType } from '@/enums/price-type.enum';

registerEnumType(PriceType, {
  name: 'PriceType'
});

export { PriceType };
