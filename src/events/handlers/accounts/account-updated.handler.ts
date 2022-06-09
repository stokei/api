import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountUpdatedEvent } from '@/events/implements/accounts/account-updated.event';

@EventsHandler(AccountUpdatedEvent)
export class AccountUpdatedHandler
  implements IEventHandler<AccountUpdatedEvent>
{
  async handle(event: AccountUpdatedEvent) {
    const { account } = event;
    Logger.log(`#${account.id} - updated!`, AccountUpdatedHandler.name);
    return event;
  }
}
