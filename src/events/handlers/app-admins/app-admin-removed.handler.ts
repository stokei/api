import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AppAdminRemovedEvent } from '@/events/implements/app-admins/app-admin-removed.event';

@EventsHandler(AppAdminRemovedEvent)
export class AppAdminRemovedHandler
  implements IEventHandler<AppAdminRemovedEvent>
{
  async handle(event: AppAdminRemovedEvent) {
    const { appAdmin } = event;
    Logger.log(`#${appAdmin.id} - removed!`, AppAdminRemovedHandler.name);
    return event;
  }
}
