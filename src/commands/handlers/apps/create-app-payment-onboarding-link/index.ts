import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppPaymentOnboardingLinkCommand } from '@/commands/implements/apps/create-app-payment-onboarding-link.command';
import {
  AppNotFoundException,
  AppUnauthorizedException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { LinkModel } from '@/models/link.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateAccountByPaymentProcessorService } from '@/services/payments-gateway/create-account';

type CreateAppPaymentOnboardingLinkCommandKeys =
  keyof CreateAppPaymentOnboardingLinkCommand;

@CommandHandler(CreateAppPaymentOnboardingLinkCommand)
export class CreateAppPaymentOnboardingLinkCommandHandler
  implements ICommandHandler<CreateAppPaymentOnboardingLinkCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createAccountByPaymentProcessorService: CreateAccountByPaymentProcessorService
  ) {}

  async execute(command: CreateAppPaymentOnboardingLinkCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppPaymentOnboardingLinkCommandKeys>(
        'app'
      );
    }
    if (!data?.cancelURL) {
      throw new ParamNotFoundException<CreateAppPaymentOnboardingLinkCommandKeys>(
        'cancelURL'
      );
    }
    if (!data?.successURL) {
      throw new ParamNotFoundException<CreateAppPaymentOnboardingLinkCommandKeys>(
        'successURL'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    if (app.isStokei) {
      throw new AppUnauthorizedException();
    }

    const onboarding =
      await this.createAccountByPaymentProcessorService.execute({
        ...data,
        app
      });

    if (!onboarding) {
      throw new AppUnauthorizedException();
    }
    return new LinkModel(onboarding);
  }

  private clearData(
    command: CreateAppPaymentOnboardingLinkCommand
  ): CreateAppPaymentOnboardingLinkCommand {
    return cleanObject({
      paymentGatewayType: cleanValue(command?.paymentGatewayType),
      successURL: cleanValue(command?.successURL),
      cancelURL: cleanValue(command?.cancelURL),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
