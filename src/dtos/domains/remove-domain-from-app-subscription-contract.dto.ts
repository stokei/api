import { DomainModel } from '@/models/domain.model';

export interface RemoveDomainFromAppSubscriptionContractDTO {
  domain: DomainModel;
  removedBy: string;
}
