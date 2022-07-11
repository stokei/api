import { CountPaymentMethodsRepository } from './count-payment-methods';
import { CreatePaymentMethodRepository } from './create-payment-method';
import { ExistsPaymentMethodsRepository } from './exists-payment-methods';
import { FindAllPaymentMethodsRepository } from './find-all-payment-methods';
import { FindPaymentMethodByIdRepository } from './find-payment-method-by-id';
import { RemovePaymentMethodRepository } from './remove-payment-method';
import { UpdatePaymentMethodRepository } from './update-payment-method';

export const PaymentMethodsRepositories = [
  CountPaymentMethodsRepository,
  CreatePaymentMethodRepository,
  ExistsPaymentMethodsRepository,
  FindPaymentMethodByIdRepository,
  FindAllPaymentMethodsRepository,
  RemovePaymentMethodRepository,
  UpdatePaymentMethodRepository
];
