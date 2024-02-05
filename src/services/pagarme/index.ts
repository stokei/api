import { CreateOrUpdatePagarmeCustomerService } from './create-or-update-pagarme-customer';
import { CreatePagarmeAccountService } from './create-pagarme-account';
import { CreatePagarmeCardService } from './create-pagarme-card';
import { CreatePagarmeOrderService } from './create-pagarme-order';
import { FindPagarmeBalanceService } from './find-pagarme-balance';
import { FindPagarmeCustomerByIdService } from './find-pagarme-customer-by-id';
import { FindPagarmeOrderByIdService } from './find-pagarme-order-by-id';
import { UpdatePagarmeAccountBankService } from './update-pagarme-account-bank';

export const PagarmeServices = [
  CreatePagarmeAccountService,
  CreateOrUpdatePagarmeCustomerService,
  CreatePagarmeOrderService,
  FindPagarmeOrderByIdService,
  FindPagarmeBalanceService,
  CreatePagarmeCardService,
  FindPagarmeCustomerByIdService,
  UpdatePagarmeAccountBankService
];
