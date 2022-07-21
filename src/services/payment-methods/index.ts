import { CreatePaymentMethodService } from './create-payment-method';
import { FindAllPaymentMethodsService } from './find-all-payment-methods';
import { FindPaymentMethodByIdService } from './find-payment-method-by-id';
import { RemovePaymentMethodService } from './remove-payment-method';

export const PaymentMethodServices = [
  CreatePaymentMethodService,
  RemovePaymentMethodService,
  FindPaymentMethodByIdService,
  FindAllPaymentMethodsService
];
