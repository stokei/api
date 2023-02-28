import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountRoleCreatedEvent } from '@/events/implements/accounts/account-role-created.event';

@EventsHandler(AccountRoleCreatedEvent)
export class AccountRoleCreatedHandler
  implements IEventHandler<AccountRoleCreatedEvent>
{
  async handle(event: AccountRoleCreatedEvent) {
    const { account } = event;
    Logger.log(
      `#${account.id} - role created!`,
      AccountRoleCreatedHandler.name
    );
    return event;
  }
}
