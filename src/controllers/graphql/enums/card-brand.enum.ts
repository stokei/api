import { registerEnumType } from '@nestjs/graphql';

import { CardBrand } from '@/enums/card-brand.enum';

registerEnumType(CardBrand, {
  name: 'CardBrand'
});

export { CardBrand };
