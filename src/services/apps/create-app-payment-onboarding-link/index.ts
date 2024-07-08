import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppPaymentOnboardingLinkCommand } from '@/commands/implements/apps/create-app-payment-onboarding-link.command';
import { CreateAppPaymentOnboardingLinkDTO } from '@/dtos/apps/create-app-payment-onboarding-link.dto';
import { LinkModel } from '@/models/link.model';

@Injectable()
export class CreateAppPaymentOnboardingLinkService
  implements
    IBaseService<CreateAppPaymentOnboardingLinkDTO, Promise<LinkModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppPaymentOnboardingLinkDTO): Promise<LinkModel> {
    return await this.commandBus.execute(
      new CreateAppPaymentOnboardingLinkCommand(data)
    );
  }
}
