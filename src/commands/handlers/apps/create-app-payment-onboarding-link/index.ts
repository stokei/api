import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppPaymentOnboardingLinkCommand } from '@/commands/implements/apps/create-app-payment-onboarding-link.command';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import {
  AppNotFoundException,
  AppUnauthorizedException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AppModel } from '@/models/app.model';
import { LinkModel } from '@/models/link.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateAppService } from '@/services/apps/update-app';
import { CreateAccountByPaymentProcessorService } from '@/services/payments-gateway/create-account';

type CreateAppPaymentOnboardingLinkCommandKeys =
  keyof CreateAppPaymentOnboardingLinkCommand;

@CommandHandler(CreateAppPaymentOnboardingLinkCommand)
export class CreateAppPaymentOnboardingLinkCommandHandler
  implements ICommandHandler<CreateAppPaymentOnboardingLinkCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createAccountByPaymentProcessorService: CreateAccountByPaymentProcessorService,
    private readonly updateAppService: UpdateAppService
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

    // COLOCAR PARA FUNCIONAR

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
    await this.updateAppPaymentId({
      app,
      onboardingId: onboarding.id,
      paymentGatewayType: data.paymentGatewayType,
      updatedBy: data.createdBy
    });
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

  private updateAppPaymentId({
    onboardingId,
    app,
    paymentGatewayType,
    updatedBy
  }: {
    onboardingId: string;
    updatedBy: string;
    app: AppModel;
    paymentGatewayType: PaymentGatewayType;
  }) {
    const keys: Record<PaymentGatewayType, string> = {
      [PaymentGatewayType.STRIPE]: 'stripeAccount',
      [PaymentGatewayType.PAGARME]: 'pagarmeAccount'
    };

    return this.updateAppService.execute({
      data: {
        [keys[paymentGatewayType]]: onboardingId,
        updatedBy
      },
      where: {
        app: app.id
      }
    });
  }
}
