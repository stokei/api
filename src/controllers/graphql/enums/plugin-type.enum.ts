import { registerEnumType } from '@nestjs/graphql';

import { PluginType } from '@/enums/plugin-type.enum';

registerEnumType(PluginType, {
  name: 'PluginType'
});

export { PluginType };
