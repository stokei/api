import { CreatePaymentMethodService } from './create-payment-method';
import { FindAllPaymentMethodsService } from './find-all-payment-methods';
import { FindPaymentMethodByIdService } from './find-payment-method-by-id';
import { RemovePaymentMethodService } from './remove-payment-method';
import { UpdatePaymentMethodService } from './update-payment-method';

export const PaymentMethodServices = [
  CreatePaymentMethodService,
  RemovePaymentMethodService,
  UpdatePaymentMethodService,
  FindPaymentMethodByIdService,
  FindAllPaymentMethodsService
];
