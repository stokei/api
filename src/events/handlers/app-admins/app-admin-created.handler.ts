import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AppAdminCreatedEvent } from '@/events/implements/app-admins/app-admin-created.event';

@EventsHandler(AppAdminCreatedEvent)
export class AppAdminCreatedHandler
  implements IEventHandler<AppAdminCreatedEvent>
{
  async handle(event: AppAdminCreatedEvent) {
    const { appAdmin } = event;
    Logger.log(`#${appAdmin.id} - created!`, AppAdminCreatedHandler.name);
    return event;
  }
}
