import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

export const defaultAccountId = createServiceId({
  service: ServerStokeiApiIdPrefix.ACCOUNTS,
  module: ServerStokeiApiIdPrefix.ACCOUNTS,
  id: 'stokei'
});
