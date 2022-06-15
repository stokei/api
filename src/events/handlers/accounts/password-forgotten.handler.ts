import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PasswordForgottenEvent } from '@/events/implements/accounts/password-forgotten.event';

@EventsHandler(PasswordForgottenEvent)
export class PasswordForgottenHandler
  implements IEventHandler<PasswordForgottenEvent>
{
  async handle(event: PasswordForgottenEvent) {
    const { account } = event;
    Logger.log(
      `#${account.id} - password forgotten!`,
      PasswordForgottenHandler.name
    );
    return event;
  }
}
