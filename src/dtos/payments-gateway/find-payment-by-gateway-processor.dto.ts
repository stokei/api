import { IBaseService } from '@stokei/nestjs';

import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { AppModel } from '@/models/app.model';

export interface FindPaymentByPaymentProcessorResponse {
  id: string;
  status: string;
  referenceId: string;
}

export interface FindPaymentByPaymentProcessorDTO {
  id: string;
  paymentGatewayType: PaymentGatewayType;
  app: AppModel;
}

export type IBaseServiceFindPaymentByPaymentProcessor = IBaseService<
  FindPaymentByPaymentProcessorDTO,
  Promise<FindPaymentByPaymentProcessorResponse>
>;
