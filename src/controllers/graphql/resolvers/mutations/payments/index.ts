import { CreatePaymentResolver } from './create-payment';
import { RemovePaymentResolver } from './remove-payment';
import { UpdatePaymentResolver } from './update-payment';

export const PaymentsMutations = [
  CreatePaymentResolver,
  RemovePaymentResolver,
  UpdatePaymentResolver
];
