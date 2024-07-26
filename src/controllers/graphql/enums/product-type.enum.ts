import { registerEnumType } from '@nestjs/graphql';

import { ProductType } from '@/enums/product-type.enum';

registerEnumType(ProductType, {
  name: 'ProductType'
});

export { ProductType };
