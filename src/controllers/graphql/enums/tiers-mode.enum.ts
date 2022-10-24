import { registerEnumType } from '@nestjs/graphql';

import { TiersMode } from '@/enums/tiers-mode.enum';

registerEnumType(TiersMode, {
  name: 'TiersMode'
});

export { TiersMode };
