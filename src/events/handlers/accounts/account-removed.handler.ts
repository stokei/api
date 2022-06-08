import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
