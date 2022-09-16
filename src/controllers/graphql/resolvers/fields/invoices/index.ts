import { InvoiceAppResolver } from './app';
import { InvoiceCreatedByResolver } from './created-by';
import { InvoiceCurrencyResolver } from './currency';
import { InvoiceCustomerResolver } from './customer';
import { InvoicePriceResolver } from './price';
import { InvoiceProductResolver } from './product';
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
  InvoiceCustomerResolver,
  InvoicePriceResolver,
  InvoiceProductResolver
];
