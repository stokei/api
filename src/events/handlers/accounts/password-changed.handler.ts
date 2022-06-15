import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PasswordChangedEvent } from '@/events/implements/accounts/password-changed.event';

@EventsHandler(PasswordChangedEvent)
export class PasswordChangedHandler
  implements IEventHandler<PasswordChangedEvent>
{
  async handle(event: PasswordChangedEvent) {
    const { account } = event;
    Logger.log(
      `#${account.id} - password changed!`,
      PasswordChangedHandler.name
    );
    return event;
  }
}
