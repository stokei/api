import { ICommand } from '@nestjs/cqrs';

import { CreateAppPaymentOnboardingLinkDTO } from '@/dtos/apps/create-app-payment-onboarding-link.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';

export class CreateAppPaymentOnboardingLinkCommand
  implements ICommand, CreateAppPaymentOnboardingLinkDTO
{
  paymentGatewayType: PaymentGatewayType;
  successURL: string;
  cancelURL: string;
  app: string;
  createdBy: string;
  constructor(data: CreateAppPaymentOnboardingLinkDTO) {
    this.paymentGatewayType = data.paymentGatewayType;
    this.successURL = data.successURL;
    this.cancelURL = data.cancelURL;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
