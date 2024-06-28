import { MercadoPagoCompleteAccountProcessorService } from './complete-account';
import { MercadoPagoCreateAccountProcessorService } from './create-account';
import { MercadoPagoCreatePaymentProcessorService } from './create-payment';
import { MercadoPagoFindPaymentProcessorService } from './find-payment';

export const MercadoPagoProcessorsServices = [
  MercadoPagoCreateAccountProcessorService,
  MercadoPagoCreatePaymentProcessorService,
  MercadoPagoCompleteAccountProcessorService,
  MercadoPagoFindPaymentProcessorService
];
