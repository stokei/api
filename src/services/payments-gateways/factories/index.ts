import { CompleteAccountByPaymentProcessorService } from './complete-account';
import { CreateAccountByPaymentProcessorService } from './create-account';
import { CreatePaymentByPaymentProcessorService } from './create-payment';
import { FindPaymentByPaymentProcessorService } from './find-payment';

export const PaymentsGatewayFactoriesServices = [
  CreatePaymentByPaymentProcessorService,
  CreateAccountByPaymentProcessorService,
  CompleteAccountByPaymentProcessorService,
  FindPaymentByPaymentProcessorService
];
