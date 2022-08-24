import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { UpdateAppStripeCustomerCommand } from '@/commands/implements/apps/update-app-stripe-customer.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { UpdateStripeCustomerService } from '@/services/stripe/update-stripe-customer';

@CommandHandler(UpdateAppStripeCustomerCommand)
export class UpdateAppStripeCustomerCommandHandler
  implements ICommandHandler<UpdateAppStripeCustomerCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly updateStripeCustomerService: UpdateStripeCustomerService
  ) {}

  async execute(command: UpdateAppStripeCustomerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException('app');
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const customerUpdated = await this.updateStripeCustomerService.execute({
      data: {
        name: app.name,
        email: app.email
      },
      where: {
        stripeAccount: app.stripeAccount,
        stripeCustomer: app.stripeCustomer
      }
    });
    return !!customerUpdated;
  }

  private clearData(
    command: UpdateAppStripeCustomerCommand
  ): UpdateAppStripeCustomerCommand {
    return cleanObject({
      app: cleanValue(command?.app)
    });
  }
}
