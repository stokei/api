import { IBaseService } from '@stokei/nestjs';

import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { AppModel } from '@/models/app.model';
import { LinkModel } from '@/models/link.model';

export interface CompleteAccountByPaymentProcessorDTO {
  paymentGatewayType: PaymentGatewayType;
  successURL: string;
  cancelURL: string;
  code?: string;
  app: AppModel;
  createdBy: string;
}

export type IBaseServiceCompleteAccountByPaymentProcessor = IBaseService<
  CompleteAccountByPaymentProcessorDTO,
  Promise<LinkModel>
>;
