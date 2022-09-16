import { CreatePaymentMethodDTO } from './create-payment-method.dto';

export interface CreatePaymentMethodRepositoryDTO
  extends CreatePaymentMethodDTO {
  stripePaymentMethod: string;
  lastFourCardNumber?: string;
  cardBrand?: string;
}
