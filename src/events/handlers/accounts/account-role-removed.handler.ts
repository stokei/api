import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountRoleRemovedEvent } from '@/events/implements/accounts/account-role-removed.event';

@EventsHandler(AccountRoleRemovedEvent)
export class AccountRoleRemovedHandler
  implements IEventHandler<AccountRoleRemovedEvent>
{
  async handle(event: AccountRoleRemovedEvent) {
    const { account } = event;
    Logger.log(
      `#${account.id} - role removed!`,
      AccountRoleRemovedHandler.name
    );
    return event;
  }
}
