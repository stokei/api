export interface ActivateSubscriptionContractDTO {
  subscriptionContract: string;
  paymentMethod?: string;
  startAt?: string | number;
  endAt?: string | number;
  app: string;
  updatedBy: string;
}
