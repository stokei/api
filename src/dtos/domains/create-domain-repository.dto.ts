import { DomainStatus } from '@/enums/domain-status.enum';

import { CreateDomainDTO } from './create-domain.dto';

export interface CreateDomainRepositoryDTO extends CreateDomainDTO {
  status: DomainStatus;
}
