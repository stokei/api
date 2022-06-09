import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler
  implements IEventHandler<AccountCreatedEvent>
{
  async handle(event: AccountCreatedEvent) {
    const { account } = event;
    Logger.log(`#${account.id} - created!`, AccountCreatedHandler.name);
    return event;
  }
}
