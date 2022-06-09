import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';

@EventsHandler(AccountRemovedEvent)
export class AccountRemovedHandler
  implements IEventHandler<AccountRemovedEvent>
{
  async handle(event: AccountRemovedEvent) {
    const { account } = event;
    Logger.log(`#${account.id} - removed!`, AccountRemovedHandler.name);
    return event;
  }
}
