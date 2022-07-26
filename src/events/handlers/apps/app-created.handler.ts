import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AppCreatedEvent } from '@/events/implements/apps/app-created.event';

@EventsHandler(AppCreatedEvent)
export class AppCreatedHandler implements IEventHandler<AppCreatedEvent> {
  async handle(event: AppCreatedEvent) {
    const { app } = event;
    Logger.log(`#${app.id} - created!`, AppCreatedHandler.name);
    return event;
  }
}
