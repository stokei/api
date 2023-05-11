import { DomainStatus } from '@/enums/domain-status.enum';

import { ActivateDomainDTO } from './activate-domain.dto';

export interface ActivateDomainRepositoryDTO extends ActivateDomainDTO {
  status: DomainStatus;
  active: boolean;
  activatedAt: string;
}
