import { SubscriptionContractAppResolver } from './app';
import { SubscriptionContractCreatedByResolver } from './created-by';
import { SubscriptionContractSubscriptionContractItemsResolver } from './items';
import { SubscriptionContractLastInvoiceResolver } from './last-invoice';
import { SubscriptionContractParentResolver } from './parent';
import { SubscriptionContractPaymentMethodResolver } from './payment-method';
import { SubscriptionContractReferenceResolver } from './reference';
import { SubscriptionContractUpdatedByResolver } from './updated-by';

export const SubscriptionContractsFieldsResolvers = [
  SubscriptionContractReferenceResolver,
  SubscriptionContractAppResolver,
  SubscriptionContractCreatedByResolver,
  SubscriptionContractUpdatedByResolver,
  SubscriptionContractLastInvoiceResolver,
  SubscriptionContractPaymentMethodResolver,
  SubscriptionContractSubscriptionContractItemsResolver,
  SubscriptionContractParentResolver
];
