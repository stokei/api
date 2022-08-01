import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

export const defaultAppId = createServiceId({
  service: ServerStokeiApiIdPrefix.APPS,
  module: ServerStokeiApiIdPrefix.APPS,
  id: 'stokei'
});
