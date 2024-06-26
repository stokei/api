import { MercadoPagoCompleteAccountProcessorService } from './complete-account';
import { MercadoPagoCreateAccountProcessorService } from './create-account';
import { MercadoPagoCreatePaymentProcessorService } from './create-payment';

export const MercadoPagoProcessorsServices = [
  MercadoPagoCreateAccountProcessorService,
  MercadoPagoCreatePaymentProcessorService,
  MercadoPagoCompleteAccountProcessorService
];
