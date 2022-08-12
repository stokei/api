import { SubscriptionContractAppResolver } from './app';
import { SubscriptionContractClassroomResolver } from './classroom';
import { SubscriptionContractCreatedByResolver } from './created-by';
import { SubscriptionContractDefaultPaymentMethodResolver } from './default-payment-method';
import { SubscriptionContractOrderProductResolver } from './order-product';
import { SubscriptionContractPlanResolver } from './plan';
import { SubscriptionContractReferenceResolver } from './reference';
import { SubscriptionContractUpdatedByResolver } from './updated-by';

export const SubscriptionContractsFieldsResolvers = [
  SubscriptionContractReferenceResolver,
  SubscriptionContractAppResolver,
  SubscriptionContractOrderProductResolver,
  SubscriptionContractClassroomResolver,
  SubscriptionContractPlanResolver,
  SubscriptionContractDefaultPaymentMethodResolver,
  SubscriptionContractCreatedByResolver,
  SubscriptionContractUpdatedByResolver
];
