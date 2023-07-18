import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UpdateOwnPasswordCreatedEvent } from '@/events/implements/accounts/update-own-password-created.event';

@EventsHandler(UpdateOwnPasswordCreatedEvent)
export class UpdateOwnPasswordCreatedHandler
  implements IEventHandler<UpdateOwnPasswordCreatedEvent>
{
  async handle(event: UpdateOwnPasswordCreatedEvent) {
    const { account } = event;
    Logger.log(
      `#${account.id} - created!`,
      UpdateOwnPasswordCreatedHandler.name
    );
    return event;
  }
}
