import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

export const defaultCurrencyId = createServiceId({
  service: ServerStokeiApiIdPrefix.CURRENCIES,
  module: ServerStokeiApiIdPrefix.CURRENCIES,
  id: 'brl'
});
