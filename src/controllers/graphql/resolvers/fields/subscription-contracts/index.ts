import { SubscriptionContractAppResolver } from './app';
import { SubscriptionContractClassroomResolver } from './classroom';
import { SubscriptionContractCreatedByResolver } from './created-by';
import { SubscriptionContractCurrencyResolver } from './currency';
import { SubscriptionContractDefaultPaymentMethodResolver } from './default-payment-method';
import { SubscriptionContractPlanResolver } from './plan';
import { SubscriptionContractReferenceResolver } from './reference';
import { SubscriptionContractUpdatedByResolver } from './updated-by';

export const SubscriptionContractsFieldsResolvers = [
  SubscriptionContractReferenceResolver,
  SubscriptionContractAppResolver,
  SubscriptionContractClassroomResolver,
  SubscriptionContractPlanResolver,
  SubscriptionContractCurrencyResolver,
  SubscriptionContractDefaultPaymentMethodResolver,
  SubscriptionContractCreatedByResolver,
  SubscriptionContractUpdatedByResolver
];
