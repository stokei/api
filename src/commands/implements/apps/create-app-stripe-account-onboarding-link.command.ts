import { ICommand } from '@nestjs/cqrs';

import { CreateAppStripeAccountOnboardingLinkDTO } from '@/dtos/apps/create-app-stripe-account-onboarding-link.dto';

export class CreateAppStripeAccountOnboardingLinkCommand
  implements ICommand, CreateAppStripeAccountOnboardingLinkDTO
{
  app: string;
  createdBy: string;
  constructor(data: CreateAppStripeAccountOnboardingLinkDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
