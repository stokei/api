import { CreatePaymentMethodBoletoService } from './create-payment-method-boleto';
import { CreatePaymentMethodCardService } from './create-payment-method-card';
import { CreatePaymentMethodPixService } from './create-payment-method-pix';
import { FindAllPaymentMethodsService } from './find-all-payment-methods';
import { FindPaymentMethodByIdService } from './find-payment-method-by-id';
import { FindPaymentMethodByStripePaymentMethodService } from './find-payment-method-by-stripe-payment-method';
import { RemovePaymentMethodService } from './remove-payment-method';

export const PaymentMethodServices = [
  CreatePaymentMethodCardService,
  CreatePaymentMethodBoletoService,
  CreatePaymentMethodPixService,
  RemovePaymentMethodService,
  FindPaymentMethodByIdService,
  FindAllPaymentMethodsService,
  FindPaymentMethodByStripePaymentMethodService
];
