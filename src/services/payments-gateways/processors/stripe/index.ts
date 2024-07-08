import { StripeCreateAccountProcessorService } from './create-account';
import { StripeCreatePaymentProcessorService } from './create-payment';

export const StripeProcessorsServices = [
  StripeCreateAccountProcessorService,
  StripeCreatePaymentProcessorService
];
