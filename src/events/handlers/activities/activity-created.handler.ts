import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ActivityCreatedEvent } from '@/events/implements/activities/activity-created.event';

@EventsHandler(ActivityCreatedEvent)
export class ActivityCreatedHandler
  implements IEventHandler<ActivityCreatedEvent>
{
  async handle(event: ActivityCreatedEvent) {
    const { activity } = event;
    Logger.log(`#${activity.id} - created!`, ActivityCreatedHandler.name);
    return event;
  }
}
