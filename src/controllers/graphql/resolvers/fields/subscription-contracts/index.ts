import { SubscriptionContractAppResolver } from './app';
import { SubscriptionContractClassroomResolver } from './classroom';
import { SubscriptionContractCreatedByResolver } from './created-by';
import { SubscriptionContractLastInvoiceResolver } from './last-invoice';
import { SubscriptionContractPaymentMethodResolver } from './payment-method';
import { SubscriptionContractPlanResolver } from './plan';
import { SubscriptionContractReferenceResolver } from './reference';
import { SubscriptionContractUpdatedByResolver } from './updated-by';

export const SubscriptionContractsFieldsResolvers = [
  SubscriptionContractReferenceResolver,
  SubscriptionContractAppResolver,
  SubscriptionContractClassroomResolver,
  SubscriptionContractPlanResolver,
  SubscriptionContractCreatedByResolver,
  SubscriptionContractUpdatedByResolver,
  SubscriptionContractLastInvoiceResolver,
  SubscriptionContractPaymentMethodResolver
];
