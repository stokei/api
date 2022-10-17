import { SubscriptionContractAppResolver } from './app';
import { SubscriptionContractCourseResolver } from './course';
import { SubscriptionContractCreatedByResolver } from './created-by';
import { SubscriptionContractLastInvoiceResolver } from './last-invoice';
import { SubscriptionContractPaymentMethodResolver } from './payment-method';
import { SubscriptionContractPlanResolver } from './plan';
import { SubscriptionContractReferenceResolver } from './reference';
import { SubscriptionContractUpdatedByResolver } from './updated-by';

export const SubscriptionContractsFieldsResolvers = [
  SubscriptionContractReferenceResolver,
  SubscriptionContractAppResolver,
  SubscriptionContractCourseResolver,
  SubscriptionContractPlanResolver,
  SubscriptionContractCreatedByResolver,
  SubscriptionContractUpdatedByResolver,
  SubscriptionContractLastInvoiceResolver,
  SubscriptionContractPaymentMethodResolver
];
