import { CreatePaymentMethodBoletoService } from './create-payment-method-boleto';
import { CreatePaymentMethodCardService } from './create-payment-method-card';
import { CreatePaymentMethodCardByCardHashService } from './create-payment-method-card-by-card-hash';
import { CreatePaymentMethodPixService } from './create-payment-method-pix';
import { FindAllPaymentMethodsService } from './find-all-payment-methods';
import { FindPaymentMethodByIdService } from './find-payment-method-by-id';
import { RemovePaymentMethodService } from './remove-payment-method';
import { UpdatePaymentMethodService } from './update-payment-method';

export const PaymentMethodServices = [
  CreatePaymentMethodCardService,
  CreatePaymentMethodBoletoService,
  CreatePaymentMethodPixService,
  RemovePaymentMethodService,
  FindPaymentMethodByIdService,
  FindAllPaymentMethodsService,
  UpdatePaymentMethodService,
  CreatePaymentMethodCardByCardHashService
];
