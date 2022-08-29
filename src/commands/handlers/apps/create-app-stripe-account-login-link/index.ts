import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppStripeAccountLoginLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-login-link.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  StripeAccountNotFoundException
} from '@/errors';
import { LinkMapper } from '@/mappers/links';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateStripeAccountLoginLinkService } from '@/services/stripe/create-stripe-account-login-link';

type CreateAppStripeAccountLoginLinkCommandKeys =
  keyof CreateAppStripeAccountLoginLinkCommand;

@CommandHandler(CreateAppStripeAccountLoginLinkCommand)
export class CreateAppStripeAccountLoginLinkCommandHandler
  implements ICommandHandler<CreateAppStripeAccountLoginLinkCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createStripeAccountLoginLinkService: CreateStripeAccountLoginLinkService
  ) {}

  async execute(command: CreateAppStripeAccountLoginLinkCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppStripeAccountLoginLinkCommandKeys>(
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

    const link = await this.createStripeAccountLoginLinkService.execute({
      stripeAccount: app.stripeAccount
    });
    if (!link) {
      throw new AppNotFoundException();
    }
    return new LinkMapper().toModel(link);
  }

  private clearData(
    command: CreateAppStripeAccountLoginLinkCommand
  ): CreateAppStripeAccountLoginLinkCommand {
    return cleanObject({
      app: cleanValue(command?.app)
    });
  }
}
