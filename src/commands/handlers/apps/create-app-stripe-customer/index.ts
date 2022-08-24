import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppStripeCustomerCommand } from '@/commands/implements/apps/create-app-stripe-customer.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateAppService } from '@/services/apps/update-app';
import { CreateStripeCustomerService } from '@/services/stripe/create-stripe-customer';

type CreateAppStripeCustomerCommandKeys = keyof CreateAppStripeCustomerCommand;

@CommandHandler(CreateAppStripeCustomerCommand)
export class CreateAppStripeCustomerCommandHandler
  implements ICommandHandler<CreateAppStripeCustomerCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createStripeCustomerService: CreateStripeCustomerService,
    private readonly updateAppService: UpdateAppService
  ) {}

  async execute(command: CreateAppStripeCustomerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppStripeCustomerCommandKeys>(
        'app'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const customer = await this.createStripeCustomerService.execute({
      name: app.name,
      email: app.email,
      parent: app.id,
      stripeAccount: app.stripeAccount
    });
    if (!customer) {
      throw new AppNotFoundException();
    }
    const updated = await this.updateAppService.execute({
      data: {
        stripeCustomer: customer.id,
        updatedBy: data.createdBy
      },
      where: {
        app: app.id
      }
    });
    return updated;
  }

  private clearData(
    command: CreateAppStripeCustomerCommand
  ): CreateAppStripeCustomerCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
