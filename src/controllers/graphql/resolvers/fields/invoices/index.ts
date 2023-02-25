import { InvoiceAppResolver } from './app';
import { InvoiceCreatedByResolver } from './created-by';
import { InvoiceCurrencyResolver } from './currency';
import { InvoiceCustomerAccountResolver } from './customer-account';
import { InvoiceCustomerAppResolver } from './customer-app';
import { InvoicePaymentMethodResolver } from './payment-method';
import { InvoiceReferenceResolver } from './reference';
import { InvoiceSubscriptionContractResolver } from './subscription-contract';
import { InvoiceUpdatedByResolver } from './updated-by';

export const InvoicesFieldsResolvers = [
  InvoiceReferenceResolver,
  InvoiceAppResolver,
  InvoiceCreatedByResolver,
  InvoiceUpdatedByResolver,
  InvoiceCurrencyResolver,
  InvoiceSubscriptionContractResolver,
  InvoiceCustomerAccountResolver,
  InvoiceCustomerAppResolver,
  InvoicePaymentMethodResolver
];
