import { DomainStatus } from '@/enums/domain-status.enum';

import { CreateDomainDTO } from './create-domain.dto';

export interface CreateDomainRepositoryDTO
  extends Omit<CreateDomainDTO, 'default'> {
  status: DomainStatus;
}
