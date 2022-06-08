import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
