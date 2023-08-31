import { CreatePagarmeAccountService } from './create-pagarme-account';
import { CreatePagarmeCustomerService } from './create-pagarme-customer';
import { CreatePagarmeOrderService } from './create-pagarme-order';
import { FindPagarmeOrderByIdService } from './find-pagarme-order-by-id';

export const PagarmeServices = [
  CreatePagarmeAccountService,
  CreatePagarmeCustomerService,
  CreatePagarmeOrderService,
  FindPagarmeOrderByIdService
];