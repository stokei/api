import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppStripeAccountOnboardingLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-onboarding-link.command';
import { CreateAppStripeAccountOnboardingLinkDTO } from '@/dtos/apps/create-app-stripe-account-onboarding-link.dto';
import { LinkModel } from '@/models/link.model';

@Injectable()
export class CreateAppStripeAccountOnboardingLinkService
  implements
    IBaseService<CreateAppStripeAccountOnboardingLinkDTO, Promise<LinkModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateAppStripeAccountOnboardingLinkDTO
  ): Promise<LinkModel> {
    return await this.commandBus.execute(
      new CreateAppStripeAccountOnboardingLinkCommand(data)
    );
  }
}
