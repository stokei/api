import { registerEnumType } from '@nestjs/graphql';

import { InventoryType } from '@/enums/inventory-type.enum';

registerEnumType(InventoryType, {
  name: 'InventoryType'
});

export { InventoryType };
