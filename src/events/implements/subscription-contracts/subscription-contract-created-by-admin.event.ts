import { SubscriptionContractModel } from '@/models/subscription-contract.model';

interface IDataSubscriptionContractCreatedByAdminEvent {
  readonly createdBy: string;
  readonly subscriptionContract: SubscriptionContractModel;
}

export class SubscriptionContractCreatedByAdminEvent {
  readonly createdBy: string;
  readonly subscriptionContract: SubscriptionContractModel;

  constructor(data: IDataSubscriptionContractCreatedByAdminEvent) {
    this.createdBy = data.createdBy;
    this.subscriptionContract = data.subscriptionContract;
  }
}
