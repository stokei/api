import { registerEnumType } from '@nestjs/graphql';

import { DomainStatus } from '@/enums/domain-status.enum';

registerEnumType(DomainStatus, {
  name: 'DomainStatus'
});

export { DomainStatus };
