import { CreateAccountByPaymentProcessorService } from './create-account';
import { CreatePaymentByPaymentProcessorService } from './create-payment';
import { PaymentsGatewayProcessorsServices } from './processors';

export const PaymentsGatewayServices = [
  ...PaymentsGatewayProcessorsServices,
  CreatePaymentByPaymentProcessorService,
  CreateAccountByPaymentProcessorService
];
