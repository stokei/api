import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AppStripeAccountCreatedEvent } from '@/events/implements/apps/app-stripe-account-created.event';

@EventsHandler(AppStripeAccountCreatedEvent)
export class AppStripeAccountCreatedHandler
  implements IEventHandler<AppStripeAccountCreatedEvent>
{
  async handle(event: AppStripeAccountCreatedEvent) {
    const { app } = event;
    Logger.log(
      `#${app.id} - Stripe Account created!`,
      AppStripeAccountCreatedHandler.name
    );
    return event;
  }
}
