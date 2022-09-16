import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppStripeAccountCommand } from '@/commands/implements/apps/create-app-stripe-account.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { StripeAccountAlreadyExistsException } from '@/errors/stripe-account-already-exists';
import { StripeAccountNotFoundException } from '@/errors/stripe-account-not-found';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateAppService } from '@/services/apps/update-app';
import { CreateStripeAccountService } from '@/services/stripe/create-stripe-account';

type CreateAppStripeAccountCommandKeys = keyof CreateAppStripeAccountCommand;

@CommandHandler(CreateAppStripeAccountCommand)
export class CreateAppStripeAccountCommandHandler
  implements ICommandHandler<CreateAppStripeAccountCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createStripeAccountService: CreateStripeAccountService,
    private readonly updateAppService: UpdateAppService
  ) {}

  async execute(command: CreateAppStripeAccountCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppStripeAccountCommandKeys>(
        'app'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    if (app.stripeAccount) {
      throw new StripeAccountAlreadyExistsException();
    }

    const stripeAccount = await this.createStripeAccountService.execute({
      app
    });
    if (!stripeAccount) {
      throw new StripeAccountNotFoundException();
    }
    const updated = await this.updateAppService.execute({
      data: {
        stripeAccount: stripeAccount.id,
        updatedBy: data.createdBy
      },
      where: {
        app: app.id
      }
    });
    if (!updated) {
      throw new AppNotFoundException();
    }
    const appUpdated = await this.findAppByIdService.execute(app.id);
    if (!appUpdated) {
      throw new AppNotFoundException();
    }
    return appUpdated;
  }

  private clearData(
    command: CreateAppStripeAccountCommand
  ): CreateAppStripeAccountCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
