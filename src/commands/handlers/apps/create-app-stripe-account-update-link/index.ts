import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppStripeAccountUpdateLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-update-link.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  StripeAccountNotFoundException
} from '@/errors';
import { LinkMapper } from '@/mappers/links';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { CreateStripeAccountUpdateLinkService } from '@/services/stripe/create-stripe-account-update-link';
import {
  mountStripeAccountOnboardingRefreshURL,
  mountStripeAccountOnboardingReturnURL
} from '@/utils/mount-stripe-account-onboarding-response-url';

type CreateAppStripeAccountUpdateLinkCommandKeys =
  keyof CreateAppStripeAccountUpdateLinkCommand;

@CommandHandler(CreateAppStripeAccountUpdateLinkCommand)
export class CreateAppStripeAccountUpdateLinkCommandHandler
  implements ICommandHandler<CreateAppStripeAccountUpdateLinkCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAppCurrentDomainService: FindAppCurrentDomainService,
    private readonly createStripeAccountUpdateLinkService: CreateStripeAccountUpdateLinkService
  ) {}

  async execute(command: CreateAppStripeAccountUpdateLinkCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppStripeAccountUpdateLinkCommandKeys>(
        'app'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    if (!app.stripeAccount) {
      throw new StripeAccountNotFoundException();
    }

    const appDomain = await this.findAppCurrentDomainService.execute(app.id);

    const link = await this.createStripeAccountUpdateLinkService.execute({
      refreshUrl: mountStripeAccountOnboardingRefreshURL({
        domain: appDomain?.url || 'https://' + app.id + '.stokei.app/admins'
      }),
      returnUrl: mountStripeAccountOnboardingReturnURL({
        domain: appDomain?.url || 'https://' + app.id + '.stokei.app/admins'
      }),
      stripeAccount: app.stripeAccount
    });
    if (!link) {
      throw new AppNotFoundException();
    }
    return new LinkMapper().toModel(link);
  }

  private clearData(
    command: CreateAppStripeAccountUpdateLinkCommand
  ): CreateAppStripeAccountUpdateLinkCommand {
    return cleanObject({
      app: cleanValue(command?.app)
    });
  }
}
