import { PaymentMethodType } from '@/enums/payment-method-type.enum';

import { CreatePaymentMethodBoletoDTO } from './create-payment-method-boleto.dto';

export interface CreatePaymentMethodBoletoRepositoryDTO
  extends CreatePaymentMethodBoletoDTO {
  paymentMethodType: PaymentMethodType;
}
