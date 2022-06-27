import { registerEnumType } from '@nestjs/graphql';

import { ThemeMode } from '@/enums/theme-mode.enum';

registerEnumType(ThemeMode, {
  name: 'ThemeMode'
});

export { ThemeMode };
