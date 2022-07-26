import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AppUpdatedEvent } from '@/events/implements/apps/app-updated.event';

@EventsHandler(AppUpdatedEvent)
export class AppUpdatedHandler implements IEventHandler<AppUpdatedEvent> {
  async handle(event: AppUpdatedEvent) {
    const { app } = event;
    Logger.log(`#${app.id} - updated!`, AppUpdatedHandler.name);
    return event;
  }
}
