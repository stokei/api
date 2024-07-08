import { IBaseService } from '@stokei/nestjs';

import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { AppModel } from '@/models/app.model';
import { LinkModel } from '@/models/link.model';

export interface CreateAccountByPaymentProcessorDTO {
  paymentGatewayType: PaymentGatewayType;
  successURL: string;
  cancelURL: string;
  app: AppModel;
  createdBy: string;
}

export type IBaseServiceCreateAccountByPaymentProcessor = IBaseService<
  CreateAccountByPaymentProcessorDTO,
  Promise<LinkModel>
>;
