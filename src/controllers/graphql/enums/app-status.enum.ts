import { registerEnumType } from '@nestjs/graphql';

import { AppStatus } from '@/enums/app-status.enum';

registerEnumType(AppStatus, {
  name: 'AppStatus'
});

export { AppStatus };
