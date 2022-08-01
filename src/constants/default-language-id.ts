import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

export const defaultLanguageId = createServiceId({
  service: ServerStokeiApiIdPrefix.LANGUAGES,
  module: ServerStokeiApiIdPrefix.LANGUAGES,
  id: 'pt-br'
});
