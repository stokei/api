import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppStripeAccountOnboardingLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-onboarding-link.command';
import {
  AppNotFoundException,
  AppUnauthorizedException,
  DataNotFoundException,
  ParamNotFoundException,
  StripeAccountNotFoundException
} from '@/errors';
import { AppStripeAccountCreatedEvent } from '@/events/implements/apps/app-stripe-account-created.event';
import { LinkMapper } from '@/mappers/links';
import { CreateAppStripeAccountService } from '@/services/apps/create-app-stripe-account';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateStripeAccountOnboardingLinkService } from '@/services/stripe/create-stripe-account-onboarding-link';
import {
  mountStripeAccountOnboardingRefreshURL,
  mountStripeAccountOnboardingReturnURL
} from '@/utils/mount-stripe-account-onboarding-response-url';

type CreateAppStripeAccountOnboardingLinkCommandKeys =
  keyof CreateAppStripeAccountOnboardingLinkCommand;

@CommandHandler(CreateAppStripeAccountOnboardingLinkCommand)
export class CreateAppStripeAccountOnboardingLinkCommandHandler
  implements ICommandHandler<CreateAppStripeAccountOnboardingLinkCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createAppStripeAccountService: CreateAppStripeAccountService,
    private readonly createStripeAccountOnboardingLinkService: CreateStripeAccountOnboardingLinkService,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateAppStripeAccountOnboardingLinkCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppStripeAccountOnboardingLinkCommandKeys>(
        'app'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    if (app.isStokei) {
      throw new AppUnauthorizedException();
    }

    let stripeAccount = app.stripeAccount;
    if (!stripeAccount) {
      const appWithStripeAccount =
        await this.createAppStripeAccountService.execute({
          app: app.id,
          createdBy: data.createdBy
        });
      if (!appWithStripeAccount?.stripeAccount) {
        throw new StripeAccountNotFoundException();
      }
      stripeAccount = appWithStripeAccount.stripeAccount;

      await this.eventBus.publish(
        new AppStripeAccountCreatedEvent({
          app: appWithStripeAccount,
          createdBy: data.createdBy
        })
      );
    }

    const link = await this.createStripeAccountOnboardingLinkService.execute({
      refreshUrl: mountStripeAccountOnboardingRefreshURL({
        appId: app.id
      }),
      returnUrl: mountStripeAccountOnboardingReturnURL({
        appId: app.id
      }),
      stripeAccount
    });
    if (!link) {
      throw new AppNotFoundException();
    }
    return new LinkMapper().toModel(link);
  }

  private clearData(
    command: CreateAppStripeAccountOnboardingLinkCommand
  ): CreateAppStripeAccountOnboardingLinkCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
