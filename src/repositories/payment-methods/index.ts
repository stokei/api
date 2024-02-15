import { CountPaymentMethodsRepository } from './count-payment-methods';
import { CreatePaymentMethodBoletoRepository } from './create-payment-method-boleto';
import { CreatePaymentMethodCardRepository } from './create-payment-method-card';
import { CreatePaymentMethodPixRepository } from './create-payment-method-pix';
import { CreatePaymentMethodStripeRepository } from './create-payment-method-stripe';
import { ExistsPaymentMethodsRepository } from './exists-payment-methods';
import { FindAllPaymentMethodsRepository } from './find-all-payment-methods';
import { FindPaymentMethodByIdRepository } from './find-payment-method-by-id';
import { RemovePaymentMethodRepository } from './remove-payment-method';
import { UpdatePaymentMethodRepository } from './update-payment-method';

export const PaymentMethodsRepositories = [
  CountPaymentMethodsRepository,
  CreatePaymentMethodCardRepository,
  CreatePaymentMethodBoletoRepository,
  CreatePaymentMethodPixRepository,
  ExistsPaymentMethodsRepository,
  FindPaymentMethodByIdRepository,
  FindAllPaymentMethodsRepository,
  RemovePaymentMethodRepository,
  UpdatePaymentMethodRepository,
  CreatePaymentMethodStripeRepository
];
